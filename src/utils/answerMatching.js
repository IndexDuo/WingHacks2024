import stringSimilarity from "string-similarity";
import { romanizeKorean } from "./romanizeKorean";

const PRONUNCIATION_ALIASES = {
  seulgi: ["seul gi", "sulgi", "seul gee", "sul gee"],
  sakura: ["sah kura", "sa kura"],
  shuhua: ["shu hua", "shoo hwa", "shoe hua", "shu hwa"],
  wendy: ["wendi"],
  yeri: ["ye ri", "yerry"],
  hayoung: ["ha young", "ha yong"],
  nagyung: ["na gyung", "na kyung", "nak young", "na young"],
  seoyeon: ["seo yeon", "suh yun", "so young"],
  momo: ["mo mo"],
  sana: ["sah na"],
  "hong eunchae": ["eunchae", "eun chae", "un che", "un chay"],
  joy: ["joi"],
  tzuyu: ["chewy", "joo ee", "zoo you", "tzu yu", "chou tzu yu"],
  rose: ["rosé", "ro say", "rose ay"],
  irene: ["eye reen", "ai rin"],
  yuqi: ["yu qi", "yuki", "oo gi", "woo gee"],
  mina: ["mee na", "meena"],
  kazuha: ["ka zu ha", "kah zoo ha"],
  chaeyoung: ["chae young", "che young", "chay yong"],
  miyeon: ["mi yeon", "mee yun", "me on"],
  jeongyeon: ["jeong yeon", "jung yun", "jong young"],
  jiwon: ["ji won", "gee one", "jee won"],
  gyuri: ["gyu ri", "kyuri"],
  soyeon: ["so yeon", "so young", "suh yun"],
  chaewon: ["chae won", "che one", "chay won"],
  jisoo: ["ji soo", "jee sue"],
  saerom: ["sae rom", "say rom"],
  jennie: ["jenny", "jeni"],
  jisun: ["ji sun", "jee sun"],
  nayeon: ["na yeon", "nah yun", "na young"],
  jiheon: ["ji heon", "jee hun", "ji hyun"],
  "huh yunjin": ["yunjin", "yun jin", "huh yun jin", "heo yunjin"],
  jihyo: ["ji hyo", "jee yo", "gee hee yo"],
  dahyun: ["da hyun", "dah yun", "day hyun"],
  minnie: ["mini"],
};

const LEADING_FILLER = /^(?:i\s+think\s+(?:it\s+is|its)|i\s+think|it\s+is|its|that\s+is|thats|this\s+is|the\s+answer\s+is|answer\s+is)\s+/;

export const normalizeGuess = (value = "") =>
  romanizeKorean(String(value))
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(LEADING_FILLER, "")
    .trim();

export const getAnswerAliases = (photo) => {
  if (!photo?.name) return [];

  const canonical = normalizeGuess(photo.name);
  const aliases = [photo.name, photo.korean, ...(PRONUNCIATION_ALIASES[canonical] || [])];
  const nameParts = canonical.split(" ");

  if (nameParts.length > 1) aliases.push(nameParts[nameParts.length - 1]);

  return [...new Set(aliases.filter(Boolean).map(normalizeGuess).filter(Boolean))];
};

const similarityThreshold = (length) => {
  if (length <= 3) return 0.9;
  if (length <= 5) return 0.76;
  if (length <= 8) return 0.7;
  return 0.66;
};

export const evaluateGuess = (alternatives, photo) => {
  const aliases = getAnswerAliases(photo);
  let best = { accepted: false, score: 0, transcript: "", alias: "" };

  for (const alternative of alternatives) {
    const transcript = normalizeGuess(
      typeof alternative === "string" ? alternative : alternative.transcript
    );
    if (!transcript) continue;

    for (const alias of aliases) {
      const compactTranscript = transcript.replace(/\s/g, "");
      const compactAlias = alias.replace(/\s/g, "");
      const exact = compactTranscript === compactAlias;
      const phraseMatch = alias.length >= 4 && (` ${transcript} `).includes(` ${alias} `);
      const score = Math.max(
        stringSimilarity.compareTwoStrings(transcript, alias),
        stringSimilarity.compareTwoStrings(compactTranscript, compactAlias)
      );
      const accepted = exact || phraseMatch || score >= similarityThreshold(compactAlias.length);

      if (accepted || score > best.score) {
        best = { accepted, score, transcript, alias };
      }

      if (exact) return best;
    }
  }

  return best;
};
