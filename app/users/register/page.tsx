import Link from "next/link";
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

export default function RegisterPage() {
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
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Prénom</Label>
                <Input id="first-name" placeholder="Prénom" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Nom</Label>
                <Input id="last-name" placeholder="Nom" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="prenom.nom@cevidentia.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              Créér un compte
            </Button>
          </div>
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
