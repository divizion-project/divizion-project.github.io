"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { Terminal, Check, Copy, X } from "lucide-react";
import { useLanguage } from "./provider";

export function MacInstallHelp({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (open) {
      setStep(0);
      setCopied(false);
    }
  }, [open]);
  const command = "xattr -cr /Applications/Divizion\\ Launcher.app";
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="dialog-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="mac-dialog"
                initial={{ opacity: 0, scale: 0.97, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={{ duration: 0.28 }}
              >
                <Dialog.Close
                  className="dialog-close"
                  aria-label={t("Fermer", "Close")}
                >
                  <X size={20} />
                </Dialog.Close>

                <Dialog.Title>
                  {t("Après le téléchargement.", "After the download.")}
                </Dialog.Title>
                <Dialog.Description>
                  {t(
                    "Placez Divizion dans Applications. Si macOS bloque son ouverture, suivez ces étapes.",
                    "Move Divizion to Applications. If macOS blocks it from opening, follow these steps.",
                  )}
                </Dialog.Description>
                <div
                  className="tutorial-steps"
                  aria-label={t("Étapes d’installation", "Installation steps")}
                >
                  {[0, 1, 2].map((n) => (
                    <button
                      key={n}
                      aria-current={step === n ? "step" : undefined}
                      onClick={() => setStep(n)}
                      className={step === n ? "active" : ""}
                    >
                      <span>0{n + 1}</span>
                      {t(
                        [
                          "Ouvrir Terminal",
                          "Copier la commande",
                          "Relancer Divizion",
                        ][n],
                        [
                          "Open Terminal",
                          "Copy the command",
                          "Open Divizion again",
                        ][n],
                      )}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    className="tutorial-content"
                    key={step}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                  >
                    {step === 0 ? (
                      <>
                        <div className="terminal-demo">
                          <Terminal size={28} />
                          <span>Terminal.app</span>
                        </div>
                        <p>
                          {t(
                            "Ouvrez Spotlight avec ⌘ + Espace, tapez « Terminal » puis appuyez sur Entrée.",
                            "Open Spotlight with ⌘ + Space, type “Terminal” and press Return.",
                          )}
                        </p>
                      </>
                    ) : step === 1 ? (
                      <>
                        <div className="command-box">
                          <code>{command}</code>
                          <button
                            aria-label={t("Copier la commande", "Copy command")}
                            onClick={() => copy(command)}
                          >
                            {copied ? <Check size={17} /> : <Copy size={17} />}
                          </button>
                        </div>
                        <p>
                          {t(
                            "Collez la commande dans Terminal puis appuyez sur Entrée. Elle retire l’attribut de quarantaine du launcher.",
                            "Paste the command in Terminal and press Return. It removes the launcher’s quarantine attribute.",
                          )}
                        </p>
                        <p className="small-note">
                          {t(
                            "Autre emplacement : tapez « xattr -cr » suivi d’un espace, glissez l’application Divizion dans Terminal, puis appuyez sur Entrée.",
                            "Another location: type “xattr -cr” followed by a space, drag the Divizion app into Terminal and press Return.",
                          )}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="terminal-demo">
                          <Check size={28} />
                          <span>{t("Ouvrez Divizion", "Open Divizion")}</span>
                        </div>
                        <p>
                          {t(
                            "Vous pouvez maintenant ouvrir le launcher depuis Applications. Si le blocage persiste, consultez le guide d’installation.",
                            "You can now open the launcher from Applications. If it is still blocked, check the installation guide.",
                          )}
                        </p>
                        <Link
                          className="text-link"
                          href={
                            lang === "fr"
                              ? "/wiki/problemes_installation"
                              : "/wiki/installation_issues"
                          }
                          onClick={() => onOpenChange(false)}
                        >
                          {t("Lire le guide complet", "Read the full guide")}
                        </Link>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="tutorial-actions">
                  {step > 0 && (
                    <button
                      className="button button-small button-outline"
                      onClick={() => setStep(step - 1)}
                    >
                      {t("Précédent", "Back")}
                    </button>
                  )}
                  {step < 2 ? (
                    <button
                      className="button button-small button-black"
                      onClick={() => setStep(step + 1)}
                    >
                      {t("Suivant", "Next")}
                    </button>
                  ) : (
                    <Dialog.Close className="button button-small button-black">
                      {t("Terminé", "Done")}
                    </Dialog.Close>
                  )}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
