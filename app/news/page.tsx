export default function NewsPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-8">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#3a3a3a] border-t-[#ff6b35]" />
      </div>
      <h2 className="text-3xl font-bold text-[#d0d0d0]">
        Actualités bientôt disponibles
      </h2>
      <p className="mt-4 max-w-2xl text-[#999]">
        Les actualités et mises à jour de Divizion seront disponibles
        prochainement.
      </p>
    </div>
  );
}
