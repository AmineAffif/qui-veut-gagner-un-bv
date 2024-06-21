"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Formik,
  Form,
  Field,
  FormikConfig,
  FormikProps,
  FormikErrors,
} from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

interface LoginFormValues {
  login: string;
  password: string;
}

const validate = (values: LoginFormValues): FormikErrors<LoginFormValues> => {
  const errors: FormikErrors<LoginFormValues> = {};
  if (!values.login) errors.login = "L'email ou le pseudo est requis";
  if (!values.password) errors.password = "Le mot de passe est requis";
  return errors;
};

const login = async (values: LoginFormValues) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/sign_in`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: values }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    let error = "Une erreur est survenue";
    try {
      const data = await response.json();
      if (data.error === "Invalid login or password") {
        error = "Login ou mot de passe incorrect";
      }
    } catch (e) {
      // Si la réponse n'est pas un texte valide, on garde le message d'erreur par défaut
    }
    throw new Error(error);
  }

  return response.json();
};

export default function LoginPage() {
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const handleSubmit: FormikConfig<LoginFormValues>["onSubmit"] = async (
    values,
    { setSubmitting, setStatus }
  ) => {
    try {
      setSubmitting(true);
      const response = await login(values);
      console.log("values = ", values);
      console.log("response.user = ", response.user);

      authLogin(response.user); // Utiliser les informations de l'utilisateur renvoyées par la réponse
      router.push("/games/quiz");
    } catch (error: any) {
      setStatus({ error: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] flex items-center justify-center min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Se connecter</h1>
          </div>
          <Formik
            initialValues={{ login: "", password: "" }}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }: FormikProps<LoginFormValues>) => (
              <Form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="login">Email ou Pseudo</Label>
                  <Field
                    id="login"
                    name="login"
                    type="text"
                    required
                    as={Input}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Link
                      href="/users/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>
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
                  {isSubmitting ? "Connexion en cours..." : "Se connecter"}
                </Button>
              </Form>
            )}
          </Formik>
          <div className="mt-4 text-center text-sm">
            Pas encore de compte ?{" "}
            <Link href="/users/register" className="underline">
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/side-img-cevi-logo.webp"
          alt="Image"
          width="1920"
          height="1080"
          className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
