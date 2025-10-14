import { useState } from "react";
import { Form as RouterForm } from "react-router";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { KeyRound } from "lucide-react";
import type { LoginCredentials } from "~/types/auth";
import { auth } from "~/services/auth";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { toast } from "sonner";

export default function LoginPopover({
  className,
}: React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const signIn = useSignIn();

  const form = useForm<LoginCredentials>({
    defaultValues: { username: "", password: "" },
  });

  async function onSubmit(values: LoginCredentials) {
    try {
      const data = await auth.login(values);

      console.debug(data);

      const success = signIn({
        auth: {
          token: data.access,
          type: "Bearer",
        },
        userState: {
          username: values.username,
        },
        refresh: data.refresh,
      });
      if (success) {
        console.debug("logged in");
        setOpen(false);
        toast.success("Logged in");
      } else {
        throw new Error("Sign-in failed");
      }
    } catch (err) {
      console.error(err);
      form.setError("password", { message: "Invalid username or password" });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>
          Login <KeyRound />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Enter your credentials to continue.
          </DialogDescription>
        </DialogHeader>

        {/* React Router form for submission */}
        <Form {...form}>
          <RouterForm
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register("username", { required: true })}
                      placeholder="Username"
                      type="text"
                      autoComplete="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register("password", { required: true })}
                      placeholder="••••••••"
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="float-right"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </RouterForm>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
