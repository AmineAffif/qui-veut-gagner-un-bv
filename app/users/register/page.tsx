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
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const validate = (
  values: RegisterFormValues
): FormikErrors<RegisterFormValues> => {
  const errors: FormikErrors<RegisterFormValues> = {};
  if (!values.username) errors.username = "Le pseudo est requis";
  if (!values.first_name) errors.first_name = "Le prénom est requis";
  if (!values.last_name) errors.last_name = "Le nom est requis";
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
      authLogin(response.user); // Connexion automatique après l'inscription
      router.push("/home"); // Redirection vers la page d'accueil
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
              first_name: "",
              last_name: "",
              email: "",
              password: "",
            }}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }: FormikProps<RegisterFormValues>) => (
              <Form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Pseudo</Label>
                  <Field
                    id="username"
                    name="username"
                    placeholder="Pseudo"
                    required
                    as={Input}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first_name">Prénom</Label>
                    <Field
                      id="first_name"
                      name="first_name"
                      placeholder="Prénom"
                      required
                      as={Input}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last_name">Nom</Label>
                    <Field
                      id="last_name"
                      name="last_name"
                      placeholder="Nom"
                      required
                      as={Input}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="prenom.nom@cevidentia.com"
                    required
                    as={Input}
                  />
                </div>
                <div className="grid gap-2">
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
        </CardContent>
      </Card>
    </div>
  );
}
