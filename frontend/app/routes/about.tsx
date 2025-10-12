import { Mail, Globe, Twitter, Facebook, Instagram } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="container py-20 px-6 mx-auto max-w-3xl">
      <section className="space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">About 555 News</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          This website is a personal hobby project created for learning
          purposes. All information, articles, and data presented here are
          entirely fictional. Any resemblance to real people, events, or
          organizations is purely coincidental.
          <br />
          The focus of this project is on technical implementation rather than
          factual content.
        </p>
      </section>

      <Separator className="my-12" />

      <section className="flex flex-col gap-6 items-center text-center">
        <p className="text-muted-foreground">
          Have feedback or just want to get in touch? Feel free to reach out
          anytime.
        </p>

        <Button asChild variant="default" size="lg">
          <a
            href="mailto:contact@555news.com"
            className="flex gap-2 items-center"
          >
            <Mail className="w-5 h-5" />
            Send us an email
          </a>
        </Button>

        <div className="flex gap-6 pt-2">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-5 h-5 transition-colors hover:text-primary" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-5 h-5 transition-colors hover:text-primary" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-5 h-5 transition-colors hover:text-primary" />
          </a>
          <a
            href="https://555news.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe className="w-5 h-5 transition-colors hover:text-primary" />
          </a>
        </div>
      </section>
    </div>
  );
}
