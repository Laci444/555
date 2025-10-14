import { ArticleForm } from "./articleForm";
import { useState } from "react";
import { api } from "~/services/api";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import type { UserState } from "~/types/auth";

export default function ArticleNew() {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const authUser = useAuthUser<UserState>();

  const handleCreate = async (data: any) => {
    setIsSaving(true);
    try {
      const newArticle = await api.createArticle(
        { ...data, username: authUser.username },
        authHeader,
      );
      toast.success("Article created successfully");
      navigate(`/articles/${newArticle.id}`);
    } catch {
      toast.error("Failed to create article");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ArticleForm
      onSubmitData={handleCreate}
      isSubmitting={isSaving}
      submitLabel="Create article"
    />
  );
}
