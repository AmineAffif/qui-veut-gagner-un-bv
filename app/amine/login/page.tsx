"use client";

import { useRouter } from "next/navigation";
import {
  Formik,
  Form,
  Field,
  FormikConfig,
  FormikProps,
  FormikErrors,
} from "formik";
import isEmail from "validator/lib/isEmail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

interface AdminLoginFormValues {
  email: string;
  password: string;
}

const validate = (
  values: AdminLoginFormValues,
): FormikErrors<AdminLoginFormValues> => {
  const errors: FormikErrors<AdminLoginFormValues> = {};
  if (!values.email) errors.email = "L'email est requis";
  else if (!isEmail(values.email)) errors.email = "Cet email n'est pas valide";
  if (!values.password) errors.password = "Le mot de passe est requis";
  return errors;
};

const login = async (values: AdminLoginFormValues) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin_users/sign_in`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ admin_user: values }),
      credentials: "include",
    },
  );

  if (!response.ok) {
    let error = "Une erreur est survenue";
    try {
      const data = await response.json();
      if (data.error) {
        error = data.error;
      }
    } catch (e) {
      // Si la réponse n'est pas un JSON valide, on garde le message d'erreur par défaut
    }
    throw new Error(error);
  }

  return response.json();
};

export default function AdminLoginPage() {
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const handleSubmit: FormikConfig<AdminLoginFormValues>["onSubmit"] = async (
    values,
    { setSubmitting, setStatus },
  ) => {
    try {
      setSubmitting(true);
      const response = await login(values);
      authLogin(response); // Utiliser les informations de l'utilisateur renvoyées par la réponse
      router.push("/amine/dashboard");
    } catch (error: any) {
      setStatus({ error: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <div className="mx-auto w-[350px]">
        <h1 className="text-3xl font-bold text-center">Admin Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }: FormikProps<AdminLoginFormValues>) => (
            <Form className="grid gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  as={Input}
                />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  required
                  as={Input}
                />
              </div>
              {status?.error && (
                <div className="text-red-500 text-sm">{status.error}</div>
              )}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
