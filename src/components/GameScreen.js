import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBack, IoKeypadOutline, IoSparkles } from "react-icons/io5";
import VoiceRecognition from "./VoiceRecognition";
import { evaluateGuess, getAnswerAliases } from "../utils/answerMatching";
import "../styles/GameScreen.css";

const endpoints = { kpop: "/api/data", western: "/api/data2" };

const choosePhoto = (photos, usedIds) => {
  const remaining = photos.filter((photo) => !usedIds.includes(photo._id));
  return remaining[Math.floor(Math.random() * remaining.length)] || null;
};

const GameScreen = () => {
  const navigate = useNavigate();
  const { state = {} } = useLocation();
  const type = state.type;
  const [photos, setPhotos] = useState([]);
  const [usedIds, setUsedIds] = useState(state.chosenPhotos || []);
  const [photo, setPhoto] = useState(null);
  const [score, setScore] = useState(state.totalScore || 0);
  const [rounds, setRounds] = useState(state.totalRounds || 0);
  const [typedGuess, setTypedGuess] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loadState, setLoadState] = useState("loading");

  useEffect(() => {
    if (!endpoints[type]) {
      navigate("/mode-selection", { replace: true });
      return undefined;
    }

    const controller = new AbortController();
    setLoadState("loading");

    fetch(endpoints[type], { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Could not load the celebrity list.");
        return response.json();
      })
      .then((data) => {
        setPhotos(data);
        const firstPhoto = choosePhoto(data, state.chosenPhotos || []);
        setPhoto(firstPhoto);
        if (firstPhoto) {
          setUsedIds((current) => [...new Set([...current, firstPhoto._id])]);
        }
        setLoadState(firstPhoto ? "ready" : "empty");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setLoadState("error");
      });

    return () => controller.abort();
  }, [navigate, state.chosenPhotos, type]);

  const speechPhrases = useMemo(() => photos.flatMap(getAnswerAliases), [photos]);

  const submitGuess = (alternatives, source) => {
    if (!photo || feedback) return;

    const result = evaluateGuess(alternatives, photo);
    const heard =
      result.transcript ||
      (typeof alternatives[0] === "string"
        ? alternatives[0]
        : alternatives[0]?.transcript) ||
      "";

    setRounds((current) => current + 1);
    if (result.accepted) setScore((current) => current + 1);
    setFeedback({ correct: result.accepted, heard, source });
  };

  const submitTypedGuess = (event) => {
    event.preventDefault();
    if (!typedGuess.trim()) return;
    submitGuess([{ transcript: typedGuess.trim(), confidence: 1 }], "typed");
  };

  const nextRound = () => {
    const nextPhoto = choosePhoto(photos, usedIds);
    if (!nextPhoto) {
      navigate("/results", { state: { totalScore: score, totalRounds: rounds, type } });
      return;
    }

    setPhoto(nextPhoto);
    setUsedIds((current) => [...current, nextPhoto._id]);
    setTypedGuess("");
    setFeedback(null);
  };

  const endGame = () => {
    navigate("/results", { state: { totalScore: score, totalRounds: rounds, type } });
  };

  if (loadState !== "ready") {
    return (
      <main className="game-shell game-shell--centered">
        <div className="load-card" role="status">
          <IoSparkles aria-hidden="true" />
          <h1>{loadState === "loading" ? "Getting the game ready…" : "We couldn’t start this round"}</h1>
          <p>
            {loadState === "loading"
              ? "Loading the celebrity lineup."
              : "The celebrity list could not be loaded. Refresh the page or try another mode."}
          </p>
          {loadState !== "loading" && (
            <button className="secondary-button" onClick={() => navigate("/mode-selection")} type="button">
              Choose another mode
            </button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="game-shell">
      <header className="game-topbar">
        <button aria-label="Back to game modes" className="icon-button" onClick={() => navigate("/mode-selection")} type="button">
          <IoChevronBack aria-hidden="true" />
        </button>
        <div className="mode-pill">{type === "kpop" ? "K-pop" : "Western"}</div>
        <div className="scoreboard" aria-label={`Score ${score} out of ${rounds}`}>
          <span>Score</span>
          <strong>{score}/{rounds}</strong>
        </div>
      </header>

      <section className="round-card">
        <div className="round-copy">
          <span className="eyebrow">Round {rounds + 1}</span>
          <h1>Name this celebrity</h1>
          <p>Say the name as you know it in English. Perfect Korean pronunciation is not required.</p>
        </div>

        <div className="celebrity-frame">
          <img src={photo.image} alt={feedback ? photo.name : "Mystery celebrity"} />
        </div>

        {!feedback ? (
          <div className="answer-panel">
            <VoiceRecognition
              disabled={Boolean(feedback)}
              onTranscriptReceived={(alternatives) => submitGuess(alternatives, "voice")}
              phrases={speechPhrases}
            />

            <div className="answer-divider"><span>or type it</span></div>

            <form className="typed-answer" onSubmit={submitTypedGuess}>
              <IoKeypadOutline aria-hidden="true" />
              <label className="sr-only" htmlFor="typed-guess">Type the celebrity’s name</label>
              <input
                autoComplete="off"
                id="typed-guess"
                onChange={(event) => setTypedGuess(event.target.value)}
                placeholder="Type a name"
                value={typedGuess}
              />
              <button disabled={!typedGuess.trim()} type="submit">Check</button>
            </form>
          </div>
        ) : (
          <section aria-live="polite" className={`feedback-card ${feedback.correct ? "is-correct" : "is-incorrect"}`}>
            <span className="feedback-kicker">{feedback.correct ? "You got it!" : "Not this time"}</span>
            <h2>{photo.name}</h2>
            {feedback.heard && (
              <p>{feedback.source === "voice" ? "I heard" : "Your guess"}: <strong>“{feedback.heard}”</strong></p>
            )}
            <div className="feedback-actions">
              <button className="primary-button" onClick={nextRound} type="button">
                {usedIds.length >= photos.length ? "See final score" : "Next celebrity"}
              </button>
              <button className="text-button" onClick={endGame} type="button">End game</button>
            </div>
          </section>
        )}
      </section>
    </main>
  );
};

export default GameScreen;
