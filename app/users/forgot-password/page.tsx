import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Mot de passe oublié ?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Entrez l'adresse e-mail associée à votre compte et nous vous
            enverrons un lien pour réinitialiser votre mot de passe.
          </p>
        </div>
        <form action="#" className="space-y-6" method="POST">
          <div>
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              autoComplete="email"
              id="email"
              name="email"
              placeholder="Email address"
              required
              type="email"
            />
          </div>
          <Button className="w-full" type="submit">
            Envoyer
          </Button>
        </form>
        <div className="flex justify-center">
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/users/login"
          >
            Retour
          </Link>
        </div>
      </div>
    </div>
  );
}
