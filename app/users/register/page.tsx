"use client";

import Link from "next/link";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

const validate = (
  values: RegisterFormValues
): FormikErrors<RegisterFormValues> => {
  const errors: FormikErrors<RegisterFormValues> = {};
  if (!values.username) errors.username = "Le pseudo est requis";
  if (!values.email) errors.email = "L'email est requis";
  else if (!isEmail(values.email)) errors.email = "Cet email n'est pas valide";
  if (!values.password) errors.password = "Le mot de passe est requis";
  return errors;
};

const register = async (values: RegisterFormValues) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: values }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.join(", ") || "Une erreur est survenue");
  }

  return response.json();
};

export default function RegisterPage() {
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const handleSubmit: FormikConfig<RegisterFormValues>["onSubmit"] = async (
    values,
    { setSubmitting, setStatus }
  ) => {
    try {
      setSubmitting(true);
      const response = await register(values);
      sessionStorage.setItem("token", response.token); // Stocker le token dans sessionStorage
      sessionStorage.setItem("user", JSON.stringify(response.user)); // Stocker l'utilisateur dans sessionStorage
      authLogin(response.user); // Connexion automatique après l'inscription
      router.push(`/users/${response.user.id}`); // Redirection vers la page de l'utilisateur
    } catch (error: any) {
      setStatus({ error: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Inscription</CardTitle>
          <CardDescription>
            Entrez vos informations pour créer un compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
            }}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }: FormikProps<RegisterFormValues>) => (
              <Form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">
                    Pseudo <span className="text-red-500">*</span>
                  </Label>
                  <Field
                    id="username"
                    name="username"
                    placeholder="Pseudo"
                    required
                    as={Input}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="prenom.nom@gmail.com"
                    required
                    as={Input}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">
                    Mot de passe <span className="text-red-500">*</span>
                  </Label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="******"
                    required
                    as={Input}
                  />
                </div>
                {status?.error && (
                  <div className="text-red-500 text-sm">{status.error}</div>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Inscription en cours..." : "Créer un compte"}
                </Button>
              </Form>
            )}
          </Formik>
          <div className="mt-4 text-center text-sm">
            Déjà un compte ?{" "}
            <Link href="/users/login" className="underline">
              Se connecter
            </Link>
          </div>
          <div className="mt-2 text-center text-xs text-gray-500">
            <span className="text-red-500">*</span> Champs obligatoires
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
