"use client";

import * as React from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/authentication/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(null);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    axios
      .get(`http://localhost:8000/api/v1/businessOwner/CRUD/?email=${email}`)
      .then(() => {
        axios
          .post(`http://localhost:8000/api/v1/businessOwner/login`, {
            email,
          })
          .then((response) => {
            setError("");
            setIsLoading(false);
            return response;
          })
          .then((response) => {
            axios.post("/api/sendEmail", {
              to: email,
              subject: "Login",
              text: `Your login was successful!, http://localhost:3000/dashboard?token=${response.data.token} `,
            });
          })
          .catch((error) => {
            setError(error.response.data);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        setError(error.response.data);
        setIsLoading(false);
      });

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          {error && (
            <div>
              <p className="text-sm text-red-500">{error.message}</p>
            </div>
          )}
          <Button disabled={isLoading || !email}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
