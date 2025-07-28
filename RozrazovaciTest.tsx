import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const questions = [
  {
    question: "Co bys udělal/a, kdybys zahlédl/a, že někdo podvádí během kouzelnické zkoušky?",
    answers: [
      "Snažil/a bych se mu pomoct, ale nenápadně.",
      "Oznámil/a bych to, i kdyby to bylo těžké.",
      "Zamyslel/a bych se, proč to dělá, a pozoroval/a dál.",
      "Využil/a bych toho ve svůj prospěch.",
    ]
  },
  {
    question: "Kdybys měl/a možnost zúčastnit se nebezpečné, ale slavné soutěže, šel/šla bys do toho?",
    answers: [
      "Ne, dám přednost klidu a bezpečí.",
      "Pokud bych z toho mohl/a něco získat, tak určitě.",
      "Jen pokud bych byl/a dobře připravená.",
      "Ano, miluju výzvy!",
    ]
  },
  {
    question: "Jak bys popsal/a své studijní návyky?",
    answers: [
      "Miluju učení a sbírání nových znalostí.",
      "Dělám to, co musím, ale poctivě.",
      "Učím se, pokud to slouží mým cílům.",
      "Nevyhledávám to, ale překážky mě neodradí.",
    ]
  },
  {
    question: "Kdybys našel/a tajný vchod, co uděláš?",
    answers: [
      "Nejprve bych si vše promyslel/a a zjistil/a, kam vede.",
      "Neprodleně bych to nahlásil/a profesorovi.",
      "Vlezl/a bych dovnitř, abych objevil/a, co se skrývá uvnitř.",
      "Zvážil/a bych, jaký užitek z toho mohu mít.",
    ]
  },
  {
    question: "Jak řešíš konflikt se spolužákem?",
    answers: [
      "Snažím se to vyřešit spravedlivě a mírumilovně.",
      "Přemýšlím strategicky a chci z toho vyjít jako vítěz.",
      "Budu se řídit svým instinktem a chránit slabší.",
      "Snažím se pochopit jeho motivaci a diskutovat.",
    ]
  },
  {
    question: "Jak bys reagoval/a, kdybys měl/a možnost získat zakázané znalosti?",
    answers: [
      "Závisí na tom, zda by to mohlo pomoci ostatním.",
      "Raději bych je nechal/a být, není to správné.",
      "Pokud to posílí mou pozici, využiji je.",
      "Zkoumal/a bych je čistě ze zvědavosti.",
    ]
  },
  {
    question: "Jaký typ úkolů máš nejraději?",
    answers: [
      "Ty, které jsou spravedlivé a zahrnují týmovou práci.",
      "Ty, které mi dávají prostor pro kreativní řešení.",
      "Ty, kde mohu být první a nejúspěšnější.",
      "Ty, které mě nutí se něco naučit.",
    ]
  },
  {
    question: "Jak bys reagoval/a, kdyby někdo urážel tvé přátele?",
    answers: [
      "Zastanu se jich, i kdybych měl/a problémy.",
      "Najdu způsob, jak se dotyčnému postavit chytře.",
      "Pomohu přátelům se s tím vyrovnat.",
      "Navrhnu společné řešení bez konfliktu.",
    ]
  },
  {
    question: "Která kouzelnická vlastnost je ti nejbližší?",
    answers: [
      "Loajalita",
      "Vědění",
      "Odvaha",
      "Ambice",
    ]
  },
  {
    question: "Jaký předmět v Bradavicích by tě nejvíc zajímal?",
    answers: [
      "Obrana proti černé magii",
      "Lektvary a alchymie",
      "Péče o kouzelné tvory",
      "Věštění budoucnosti a starodávná moudrost",
    ]
  },
];

const answerValues = [
  [[1, 0, 0, 3], [3, 0, 0, 0], [0, 1, 2, 0], [0, 3, 0, 0]],
  [[0, 0, 0, 3], [0, 3, 0, 0], [0, 0, 3, 0], [3, 0, 0, 0]],
  [[0, 0, 3, 0], [1, 0, 0, 3], [0, 3, 0, 0], [3, 0, 1, 0]],
  [[2, 0, 2, 0], [3, 0, 0, 0], [3, 0, 0, 1], [0, 3, 0, 0]],
  [[3, 0, 0, 3], [0, 3, 0, 0], [3, 0, 0, 1], [1, 1, 3, 0]],
  [[2, 1, 0, 3], [3, 0, 0, 0], [0, 3, 0, 0], [0, 0, 3, 1]],
  [[3, 0, 0, 3], [2, 0, 3, 0], [0, 3, 0, 0], [0, 0, 3, 1]],
  [[3, 0, 0, 2], [0, 3, 1, 0], [1, 0, 3, 0], [0, 0, 1, 3]],
  [[3, 0, 0, 3], [0, 0, 3, 0], [0, 0, 0, 3], [0, 3, 0, 0]],
  [[3, 0, 1, 0], [0, 3, 0, 0], [0, 0, 1, 3], [1, 1, 3, 0]],
];

export default function RozrazovaciTest() {
  const [step, setStep] = useState(-1);
  const [username, setUsername] = useState("");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (index: number) => {
    const updatedAnswers = [...answers, index];
    setAnswers(updatedAnswers);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const scores = { Gryffindor: 0, Slytherin: 0, Ravenclaw: 0, Hufflepuff: 0 };
      updatedAnswers.forEach((answer, i) => {
        const [g, s, r, h] = answerValues[i][answer];
        scores.Gryffindor += g;
        scores.Slytherin += s;
        scores.Ravenclaw += r;
        scores.Hufflepuff += h;
      });
      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      setResult(sorted[0][0]);
      sendResultEmail(username, sorted);
    }
  };

  const sendResultEmail = async (name: string, sortedScores: [string, number][]) => {
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, result: sortedScores[0][0], scores: sortedScores })
    });
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-6 flex flex-col items-center justify-center" style={{ backgroundImage: 'url(/hogwarts-hall.jpg)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full"
      >
        <Card className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-2xl">
          <CardContent>
            {step === -1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center">✨ Kouzelný rituál rozřazení ✨</h2>
                <p className="text-sm text-center">Zadej své herní jméno a vstup do Velké síně...</p>
                <Input placeholder="Tvé herní jméno" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Button onClick={() => setStep(0)} disabled={!username} className="w-full">Začít rituál</Button>
              </div>
            )}

            {step >= 0 && step < questions.length && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold">{questions[step].question}</h3>
                {questions[step].answers.map((ans, idx) => (
                  <Button key={idx} onClick={() => handleAnswer(idx)} variant="outline" className="w-full text-left">
                    {String.fromCharCode(65 + idx)}) {ans}
                  </Button>
                ))}
              </div>
            )}

            {result && (
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">🎉 Rozřazení dokončeno!</h2>
                <p>Student <strong>{username}</strong> byl zařazen do koleje:</p>
                <p className="text-3xl font-bold">{result}</p>
                <p className="text-sm">(Kopie výsledku byla odeslána organizátorovi.)</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
