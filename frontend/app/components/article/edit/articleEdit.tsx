import { ArticleForm } from "./articleForm";
import { useState } from "react";
import { api } from "~/services/api";
import { useNavigate, useLocation } from "react-router";
import { toast } from "sonner";
import type { ArticleDetail } from "~/types/article";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export default function ArticleEdit({ article }: { article: ArticleDetail }) {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const authHeader = useAuthHeader();

  const handleSave = async (data: any) => {
    setIsSaving(true);
    try {
      await api.editArticle(article.id, data, authHeader);
      toast.success("Article updated successfully");
      navigate(location.pathname.replace("/edit", ""));
    } catch {
      toast.error("Failed to update article");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ArticleForm
      defaultValues={article}
      onSubmitData={handleSave}
      isSubmitting={isSaving}
      submitLabel="Save changes"
    />
  );
}
