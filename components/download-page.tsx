"use client";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleHelp,
  Cpu,
  Download,
  Laptop,
  Monitor,
  Terminal,
} from "lucide-react";
import { tabKeyboard } from "@/lib/tab-keyboard";
import {
  detectDevice,
  type DeviceInfo,
  type DeviceNavigator,
} from "@/lib/device";
import {
  latestRelease,
  assetsFor,
  formatBytes,
  type Channel,
  type Platform,
  type Architecture,
} from "@/lib/releases";
import { useLanguage } from "./provider";
import { useReleases } from "./release-provider";
import { MacInstallHelp } from "./mac-install-help";
import { Rails } from "./rails";

const platforms: Platform[] = ["windows", "macos", "linux"];
const channels: Channel[] = ["stable", "beta", "legacy"];
const names = { windows: "Windows", macos: "macOS", linux: "Linux" };

function DownloadQuery({ apply }: { apply: (query: string) => void }) {
  const params = useSearchParams();
  const query = params.toString();
  useEffect(() => apply(query), [query, apply]);
  return null;
}

function ProcessorHelp({ platform }: { platform: Platform }) {
  const { t } = useLanguage();
  return (
    <div className="processor-help" id="processor-help">
      <h4>{t("Trouver votre processeur", "Find your processor")}</h4>
      {platform === "macos" ? (
        <ol>
          <li>
            {t(
              "Ouvrez le menu Apple , puis « À propos de ce Mac ».",
              "Open the Apple menu , then “About This Mac”.",
            )}
          </li>
          <li>
            {t(
              "La ligne « Puce » indique Apple M1, M2, M3… ? Choisissez Apple Silicon.",
              "Does the “Chip” line say Apple M1, M2, M3…? Choose Apple Silicon.",
            )}
          </li>
          <li>
            {t(
              "La ligne « Processeur » indique Intel ? Choisissez Intel.",
              "Does the “Processor” line say Intel? Choose Intel.",
            )}
          </li>
        </ol>
      ) : platform === "windows" ? (
        <ol>
          <li>
            {t(
              "Ouvrez Paramètres → Système → Informations système (ou À propos).",
              "Open Settings → System → About.",
            )}
          </li>
          <li>
            {t(
              "Repérez « Type du système » dans les spécifications de l’appareil.",
              "Find “System type” under device specifications.",
            )}
          </li>
          <li>
            {t(
              "« Processeur x64 » : choisissez Intel / AMD. « Processeur ARM » : choisissez ARM64. Un système 32 bits n’est pas pris en charge.",
              "“x64-based processor”: choose Intel / AMD. “ARM-based processor”: choose ARM64. A 32-bit system is not supported.",
            )}
          </li>
        </ol>
      ) : (
        <ol>
          <li>
            {t(
              "Ouvrez le terminal de votre distribution.",
              "Open your distribution’s terminal.",
            )}
          </li>
          <li>
            {t(
              "Saisissez cette commande puis validez :",
              "Enter this command and press Return:",
            )}{" "}
            <code>uname -m</code>
          </li>
          <li>
            {t(
              "x86_64 : choisissez Intel / AMD. aarch64 ou arm64 : choisissez ARM64. Les versions 32 bits ne sont pas prises en charge.",
              "x86_64: choose Intel / AMD. aarch64 or arm64: choose ARM64. 32-bit systems are not supported.",
            )}
          </li>
        </ol>
      )}
    </div>
  );
}

export function DownloadPage() {
  const { t, lang } = useLanguage();
  const { releases, state } = useReleases();
  const [channel, setChannel] = useState<Channel>("stable");
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [arch, setArch] = useState<Architecture | null>(null);
  const [step, setStep] = useState(0);
  const [device, setDevice] = useState<DeviceInfo | null>(null);
  const [detecting, setDetecting] = useState(true);
  const [helpRequested, setHelpRequested] = useState(false);
  const [tutorial, setTutorial] = useState(false);
  const deviceRef = useRef<DeviceInfo | null>(null);
  const selection = useRef<{
    platform: Platform | null;
    architecture: Architecture | null;
    explicitOs: boolean;
    explicitArch: boolean;
  }>({
    platform: null,
    architecture: null,
    explicitOs: false,
    explicitArch: false,
  });
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(0);

  const applyQuery = useCallback((query: string) => {
    const params = new URLSearchParams(query);
    const os = params.get("os");
    const requestedPlatform = platforms.includes(os as Platform)
      ? (os as Platform)
      : null;
    const cpu = params.get("arch");
    const requestedArch = cpu === "x64" || cpu === "arm64" ? cpu : null;
    const detected = deviceRef.current;
    const nextPlatform = requestedPlatform || detected?.platform || null;
    const nextArch =
      requestedArch ||
      (nextPlatform === detected?.platform
        ? detected?.architecture || null
        : null);
    selection.current = {
      platform: nextPlatform,
      architecture: nextArch,
      explicitOs: !!requestedPlatform,
      explicitArch: !!requestedArch,
    };
    setPlatform(nextPlatform);
    setArch(nextArch);
    const c = params.get("channel");
    setChannel(channels.includes(c as Channel) ? (c as Channel) : "stable");
    setStep(0);
    setHelpRequested(false);
  }, []);

  useEffect(() => {
    let active = true;
    detectDevice(navigator as DeviceNavigator).then((result) => {
      if (!active) return;
      deviceRef.current = result;
      setDevice(result);
      setDetecting(false);
      const current = selection.current;
      const nextPlatform = current.explicitOs
        ? current.platform
        : result.platform;
      current.platform = nextPlatform;
      setPlatform(nextPlatform);
      // Late detection must never overwrite a query choice or a confirmed processor.
      if (!current.explicitArch) {
        const nextArch =
          nextPlatform === result.platform ? result.architecture : null;
        current.architecture = nextArch;
        setArch(nextArch);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (previousStep.current !== step)
      heading.current?.focus({ preventScroll: true });
    previousStep.current = step;
  }, [step]);

  const choosePlatform = (os: Platform) => {
    const suggestion =
      deviceRef.current?.platform === os
        ? deviceRef.current.architecture
        : null;
    selection.current = {
      platform: os,
      architecture: suggestion,
      explicitOs: true,
      explicitArch: false,
    };
    setPlatform(os);
    setArch(suggestion);
    setStep(0);
    setHelpRequested(false);
  };
  const chooseArchitecture = (cpu: Architecture) => {
    selection.current.architecture = cpu;
    selection.current.explicitArch = true;
    setArch(cpu);
  };
  const confirmArchitecture = () => {
    if (!arch || !platform) return;
    selection.current.explicitArch = true;
    setStep(2);
  };
  const release = latestRelease(releases, channel);
  const files = platform && arch ? assetsFor(release, platform, arch) : [];
  const file = files[0];
  const detectedArch =
    device?.platform === platform ? device.architecture : null;
  const needsHelp = !detecting && !detectedArch;
  const showHelp = needsHelp || helpRequested;
  const processorName = (cpu: Architecture, os: Platform) =>
    cpu === "x64"
      ? os === "macos"
        ? "Intel"
        : "Intel / AMD"
      : os === "macos"
        ? "Apple Silicon"
        : "ARM64";
  const stepLabels = [
    t("Système", "System"),
    t("Processeur", "Processor"),
    t("Téléchargement", "Download"),
  ];
  const stepTitles = [
    t("Quel est votre système ?", "Which system do you use?"),
    t("Quel processeur utilisez-vous ?", "Which processor do you use?"),
    t("Votre version est prête.", "Your release is ready."),
  ];

  return (
    <>
      <Suspense fallback={null}>
        <DownloadQuery apply={applyQuery} />
      </Suspense>
      <section className="download-hero">
        <Rails variant="sweep" />
        <div className="container">
          <div className="download-heading">
            <h1>{t("Télécharger Divizion.", "Download Divizion.")}</h1>
            <p>
              {t(
                "La bonne version, pour votre ordinateur.",
                "The right release for your computer.",
              )}
            </p>
          </div>
          <div className="download-sheet">
            <div
              className="channel-tabs"
              role="tablist"
              aria-label={t("Canal de téléchargement", "Download channel")}
            >
              {channels.map((c) => (
                <button
                  role="tab"
                  id={"channel-" + c}
                  aria-selected={channel === c}
                  aria-controls="download-content"
                  key={c}
                  tabIndex={channel === c ? 0 : -1}
                  onKeyDown={(e) =>
                    tabKeyboard(e, channels.indexOf(channel), 3, (i) =>
                      setChannel(channels[i]),
                    )
                  }
                  onClick={() => setChannel(c)}
                >
                  {c === "stable"
                    ? "Stable"
                    : c === "beta"
                      ? t("Bêta", "Beta")
                      : "Legacy"}
                  {c === "legacy" && <small>{t("Bientôt", "Soon")}</small>}
                  {channel === c && <motion.i layoutId="channel-underline" />}
                </button>
              ))}
            </div>
            <div
              className="download-content"
              id="download-content"
              role="tabpanel"
              aria-labelledby={"channel-" + channel}
            >
              {channel === "legacy" ? (
                <div className="legacy-state">
                  <h2>Divizion Legacy</h2>
                  <p>
                    {t(
                      "La version Legacy est en préparation.\nAucun téléchargement n’est proposé pour le moment.",
                      "The Legacy version is in preparation.\nNo download is available yet.",
                    )}
                  </p>
                  <button className="button button-black" disabled>
                    {t("Disponible prochainement", "Available soon")}
                  </button>
                </div>
              ) : (
                <>
                  <div className="release-summary">
                    <h2>
                      {release?.tag_name.replace(/^v/, "") ||
                        t("Version indisponible", "Release unavailable")}
                    </h2>
                    <div className="release-date">
                      {release &&
                        new Intl.DateTimeFormat(lang, {
                          dateStyle: "long",
                        }).format(new Date(release.published_at))}
                      <Link href="/releases">
                        {t("Lire les notes de version", "Read release notes")}
                      </Link>
                    </div>
                  </div>
                  {channel === "beta" && (
                    <div className="inline-notice">
                      {t(
                        "La bêta contient les nouveautés en cours de test. Des bugs peuvent être présents.",
                        "Beta contains new features currently being tested. Bugs may occur.",
                      )}
                    </div>
                  )}
                  <ol
                    className="download-steps"
                    aria-label={t("Étapes du téléchargement", "Download steps")}
                  >
                    {stepLabels.map((label, i) => (
                      <li key={i}>
                        <button
                          aria-current={step === i ? "step" : undefined}
                          disabled={i > step}
                          onClick={() => setStep(i)}
                        >
                          <span>{i < step ? <Check size={13} /> : i + 1}</span>
                          {label}
                        </button>
                      </li>
                    ))}
                  </ol>
                  <h3 className="wizard-title" ref={heading} tabIndex={-1}>
                    {step === 2 && !file
                      ? t(
                          "Ce fichier n’est pas disponible.",
                          "This file is not available.",
                        )
                      : stepTitles[step]}
                  </h3>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      className="wizard-panel"
                      initial={{ opacity: 0, y: 9 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -7 }}
                      transition={{ duration: 0.2 }}
                    >
                      {step === 0 ? (
                        <>
                          <p className="wizard-description" role="status">
                            {detecting
                              ? t(
                                  "Recherche de votre configuration…",
                                  "Checking your configuration…",
                                )
                              : device?.platform
                                ? t(
                                    "Votre système est présélectionné. Vous pouvez le modifier.",
                                    "Your system is preselected. You can change it.",
                                  )
                                : t(
                                    "Choisissez le système de l’ordinateur où vous installerez Divizion.",
                                    "Choose the system of the computer where you will install Divizion.",
                                  )}
                          </p>
                          <fieldset className="platform-choice">
                            <legend className="sr-only">
                              {t("Votre système", "Your system")}
                            </legend>
                            <div>
                              {platforms.map((os, i) => {
                                const Icon = [Monitor, Laptop, Terminal][i];
                                return (
                                  <label
                                    key={os}
                                    className={
                                      platform === os ? "selected" : ""
                                    }
                                  >
                                    <input
                                      type="radio"
                                      name="os"
                                      value={os}
                                      checked={platform === os}
                                      onChange={() => choosePlatform(os)}
                                    />
                                    <Icon size={25} strokeWidth={1.3} />
                                    <strong>{names[os]}</strong>
                                    <small>
                                      {device?.platform === os
                                        ? t(
                                            "Système détecté",
                                            "Detected system",
                                          )
                                        : t("Choisir", "Choose")}
                                    </small>
                                    {platform === os && (
                                      <Check
                                        size={15}
                                        className="platform-check"
                                      />
                                    )}
                                  </label>
                                );
                              })}
                            </div>
                          </fieldset>
                          <div className="wizard-actions">
                            <button
                              className="button button-black"
                              disabled={!platform}
                              onClick={() => setStep(1)}
                            >
                              {t("Continuer", "Continue")}
                              <ArrowRight size={17} />
                            </button>
                          </div>
                        </>
                      ) : step === 1 && platform ? (
                        <>
                          <p className="wizard-description" role="status">
                            {detecting
                              ? t(
                                  "Recherche du processeur… Vous pouvez aussi le choisir ci-dessous.",
                                  "Checking your processor… You can also choose it below.",
                                )
                              : detectedArch
                                ? t(
                                    "Le navigateur propose " +
                                      processorName(detectedArch, platform) +
                                      ". Vérifiez puis confirmez votre choix.",
                                    "Your browser suggests " +
                                      processorName(detectedArch, platform) +
                                      ". Check and confirm your choice.",
                                  )
                                : t(
                                    "Le navigateur ne peut pas identifier ce processeur. Choisissez-le à l’aide du guide ci-dessous.",
                                    "Your browser cannot identify this processor. Use the guide below to choose it.",
                                  )}
                          </p>
                          <fieldset className="processor-choice">
                            <legend className="sr-only">
                              {t("Votre processeur", "Your processor")}
                            </legend>
                            <div>
                              {(["x64", "arm64"] as Architecture[]).map(
                                (cpu) => (
                                  <label
                                    key={cpu}
                                    className={arch === cpu ? "selected" : ""}
                                  >
                                    <input
                                      type="radio"
                                      name="processor"
                                      value={cpu}
                                      checked={arch === cpu}
                                      onChange={() => chooseArchitecture(cpu)}
                                    />
                                    <Cpu size={24} strokeWidth={1.3} />
                                    <strong>
                                      {processorName(cpu, platform)}
                                    </strong>
                                    <small>
                                      {cpu === "x64"
                                        ? "x64 · 64 bits"
                                        : platform === "macos"
                                          ? t(
                                              "Puce série M · ARM64",
                                              "M-series chip · ARM64",
                                            )
                                          : platform === "windows"
                                            ? "Snapdragon · ARM64"
                                            : "aarch64 · ARM64"}
                                    </small>
                                    {arch === cpu && (
                                      <Check
                                        size={15}
                                        className="platform-check"
                                      />
                                    )}
                                  </label>
                                ),
                              )}
                            </div>
                          </fieldset>
                          {device?.platform === platform &&
                            device.unsupported32 && (
                              <p className="inline-notice">
                                {t(
                                  "Le navigateur indique un environnement 32 bits. Vérifiez le type du système ci-dessous ; Divizion nécessite un système 64 bits.",
                                  "Your browser reports a 32-bit environment. Check your system type below; Divizion requires a 64-bit system.",
                                )}
                              </p>
                            )}
                          {!needsHelp && (
                            <button
                              className="text-link processor-help-trigger"
                              aria-expanded={showHelp}
                              aria-controls="processor-help"
                              onClick={() => setHelpRequested(!helpRequested)}
                            >
                              <CircleHelp size={16} />
                              {t(
                                "Comment vérifier mon processeur ?",
                                "How do I check my processor?",
                              )}
                            </button>
                          )}
                          <AnimatePresence>
                            {showHelp && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="processor-help-wrap"
                              >
                                <ProcessorHelp platform={platform} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <div className="wizard-actions">
                            <button
                              className="text-link"
                              onClick={() => setStep(0)}
                            >
                              <ArrowLeft size={16} />
                              {t("Système", "System")}
                            </button>
                            <button
                              className="button button-black"
                              disabled={!arch}
                              onClick={confirmArchitecture}
                            >
                              {t(
                                "Confirmer le processeur",
                                "Confirm processor",
                              )}
                              <ArrowRight size={17} />
                            </button>
                          </div>
                        </>
                      ) : step === 2 && platform && arch ? (
                        <>
                          <div className="download-configuration">
                            <div>
                              <strong>
                                {names[platform]} ·{" "}
                                {processorName(arch, platform)}
                              </strong>
                              <span>
                                {arch.toUpperCase()} ·{" "}
                                {channel === "beta"
                                  ? t("Bêta", "Beta")
                                  : "Stable"}
                              </span>
                            </div>
                            <button
                              className="text-link"
                              onClick={() => setStep(1)}
                            >
                              {t("Modifier", "Change")}
                            </button>
                          </div>
                          <div className="download-action">
                            {file ? (
                              <a
                                className="button button-black"
                                href={file.browser_download_url}
                                download={file.name}
                                onClick={() => {
                                  if (platform === "macos") setTutorial(true);
                                }}
                              >
                                <Download size={18} />
                                {t("Télécharger pour", "Download for")}{" "}
                                {names[platform]}
                              </a>
                            ) : (
                              <button className="button button-black" disabled>
                                {t(
                                  "Aucun fichier disponible",
                                  "No file available",
                                )}
                              </button>
                            )}
                            <div className="download-file" aria-live="polite">
                              {file ? (
                                <>
                                  {file.name}
                                  <br />
                                  {formatBytes(file.size, lang)}
                                </>
                              ) : (
                                t(
                                  "Aucun fichier pour ce système et ce processeur. Essayez un autre canal ou vérifiez votre configuration.",
                                  "No file for this system and processor. Try another channel or check your configuration.",
                                )
                              )}
                            </div>
                          </div>
                          {files.length > 1 && (
                            <div className="other-files">
                              {files.slice(1).map((f) => (
                                <a
                                  key={f.name}
                                  href={f.browser_download_url}
                                  download={f.name}
                                >
                                  {f.name} · {formatBytes(f.size, lang)}
                                </a>
                              ))}
                            </div>
                          )}
                          {platform === "macos" && (
                            <button
                              className="text-link mac-help"
                              onClick={() => setTutorial(true)}
                            >
                              <CircleHelp size={16} />
                              {t(
                                "Aide au premier lancement sur macOS",
                                "Help with your first launch on macOS",
                              )}
                            </button>
                          )}
                          <div className="wizard-actions wizard-restart">
                            <button
                              className="text-link"
                              onClick={() => setStep(0)}
                            >
                              <ArrowLeft size={16} />
                              {t("Changer de système", "Change system")}
                            </button>
                          </div>
                        </>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                  {state === "offline" && (
                    <p className="catalog-status">
                      {t(
                        "GitHub est momentanément indisponible. Les dernières versions connues restent proposées.",
                        "GitHub is temporarily unavailable. The last known releases are still available.",
                      )}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <p className="download-legal">
            {t(
              "En utilisant Divizion, vous acceptez les",
              "By using Divizion, you accept the",
            )}{" "}
            <Link href="/legal">
              {t("conditions d’utilisation", "terms of use")}
            </Link>
            . <Link href="/privacy">{t("Confidentialité", "Privacy")}</Link>.
          </p>
        </div>
      </section>
      <MacInstallHelp open={tutorial} onOpenChange={setTutorial} />
    </>
  );
}
