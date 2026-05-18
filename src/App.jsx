import { useMemo, useState } from "react";

const questions = [
  {
    id: "energy",
    title: "어떤 문제를 풀 때 시간이 가장 빨리 가나요?",
    helper: "가장 자연스럽게 오래 붙잡을 수 있는 상황을 골라주세요.",
    options: [
      { label: "숫자와 패턴을 분석할 때", tags: ["data", "engineering", "science"] },
      { label: "사람의 행동과 마음을 이해할 때", tags: ["human", "social", "health"] },
      { label: "아이디어를 눈에 보이게 만들 때", tags: ["creative", "design", "media"] },
      { label: "사회 문제의 원인과 구조를 따질 때", tags: ["social", "business", "human"] },
    ],
  },
  {
    id: "output",
    title: "프로젝트가 끝났을 때 어떤 결과물이 남으면 만족스러운가요?",
    helper: "추천 전공은 선호하는 산출물과도 강하게 연결됩니다.",
    options: [
      { label: "작동하는 앱, 기계, 시스템", tags: ["engineering", "data"] },
      { label: "근거가 탄탄한 보고서와 인사이트", tags: ["data", "science", "business"] },
      { label: "사람을 돕는 서비스나 프로그램", tags: ["health", "human", "social"] },
      { label: "콘텐츠, 브랜드, 시각 결과물", tags: ["creative", "media", "design"] },
    ],
  },
  {
    id: "learning",
    title: "새로운 지식을 배울 때 선호하는 방식은 무엇인가요?",
    helper: "학습 방식은 전공 적응 난이도를 가늠하는 신호가 됩니다.",
    options: [
      { label: "공식과 원리를 이해한 뒤 적용한다", tags: ["science", "engineering", "data"] },
      { label: "사례를 많이 보고 공통점을 뽑는다", tags: ["business", "social", "human"] },
      { label: "직접 만들고 피드백을 받는다", tags: ["creative", "design", "engineering"] },
      { label: "현장 문제를 관찰하고 개선한다", tags: ["health", "social", "business"] },
    ],
  },
  {
    id: "environment",
    title: "어떤 작업 환경에서 가장 집중이 잘 되나요?",
    helper: "혼자 깊게 파고드는지, 함께 조율하는지에 따라 추천이 달라집니다.",
    options: [
      { label: "조용히 몰입해 복잡한 문제를 푸는 환경", tags: ["data", "science", "engineering"] },
      { label: "팀과 의견을 맞추며 방향을 정하는 환경", tags: ["business", "social", "media"] },
      { label: "사용자나 대상자를 직접 만나는 환경", tags: ["health", "human", "social"] },
      { label: "시도와 수정이 빠르게 반복되는 환경", tags: ["creative", "design", "media"] },
    ],
  },
  {
    id: "curiosity",
    title: "요즘 자주 찾아보는 주제는 어디에 가까운가요?",
    helper: "최근 관심사는 추천 결과의 마지막 가중치로 반영됩니다.",
    options: [
      { label: "AI, 소프트웨어, 데이터, 자동화", tags: ["data", "engineering"] },
      { label: "생명, 건강, 환경, 실험", tags: ["science", "health"] },
      { label: "경제, 창업, 조직, 마케팅", tags: ["business", "social"] },
      { label: "영상, 글쓰기, 디자인, 문화", tags: ["creative", "media", "design"] },
    ],
  },
];

const tagLabels = {
  data: "데이터",
  engineering: "공학",
  science: "과학",
  human: "사람 이해",
  social: "사회 구조",
  health: "건강/돌봄",
  creative: "창작",
  design: "디자인",
  media: "미디어",
  business: "비즈니스",
};

const majors = [
  {
    name: "컴퓨터공학 / 인공지능",
    tags: ["engineering", "data"],
    summary: "문제를 계산 가능한 구조로 바꾸고, 소프트웨어와 AI 시스템으로 해결하는 전공입니다.",
    knowledge: ["프로그래밍 기초", "자료구조와 알고리즘", "데이터베이스", "머신러닝 기초"],
    roadmap: ["Python 또는 JavaScript로 작은 앱 만들기", "알고리즘 문제를 주 3회 풀기", "공개 데이터로 예측 모델 실험하기"],
  },
  {
    name: "데이터사이언스 / 통계학",
    tags: ["data", "science", "business"],
    summary: "데이터에서 패턴을 찾고 의사결정에 필요한 근거를 만드는 전공입니다.",
    knowledge: ["확률과 통계", "데이터 시각화", "회귀분석", "실험 설계"],
    roadmap: ["스프레드시트로 데이터 정리 습관 만들기", "Python pandas로 분석 노트 작성하기", "하나의 사회 현상을 데이터로 설명하기"],
  },
  {
    name: "심리학 / 교육학",
    tags: ["human", "social", "health"],
    summary: "사람의 생각, 행동, 성장 과정을 이해하고 더 나은 학습과 관계를 설계하는 전공입니다.",
    knowledge: ["발달심리", "인지심리", "상담 이론", "연구방법론"],
    roadmap: ["관찰 일지로 행동 패턴 기록하기", "심리학 입문서를 읽고 개념 카드 만들기", "간단한 설문을 설계해 보기"],
  },
  {
    name: "경영학 / 창업학",
    tags: ["business", "social", "data"],
    summary: "시장, 고객, 조직을 이해하고 지속 가능한 제품과 사업을 만드는 전공입니다.",
    knowledge: ["마케팅", "회계 기초", "조직행동", "비즈니스 모델"],
    roadmap: ["관심 서비스의 수익 구조 분석하기", "작은 문제를 골라 고객 인터뷰하기", "한 장짜리 사업 가설 작성하기"],
  },
  {
    name: "디자인 / HCI",
    tags: ["design", "creative", "human", "engineering"],
    summary: "사람이 쓰기 쉬운 제품과 경험을 조사, 설계, 검증하는 전공입니다.",
    knowledge: ["사용자 조사", "정보구조", "프로토타이핑", "사용성 테스트"],
    roadmap: ["자주 쓰는 앱 화면을 분석하기", "Figma로 주요 화면 3개 재구성하기", "친구 2명에게 사용성 피드백 받기"],
  },
  {
    name: "미디어커뮤니케이션 / 콘텐츠",
    tags: ["media", "creative", "social"],
    summary: "메시지, 플랫폼, 대중문화를 이해하고 설득력 있는 콘텐츠를 만드는 전공입니다.",
    knowledge: ["커뮤니케이션 이론", "스토리텔링", "미디어 리터러시", "콘텐츠 기획"],
    roadmap: ["관심 채널의 콘텐츠 포맷 분석하기", "짧은 기획안을 매주 1개 쓰기", "영상 또는 글 콘텐츠를 실제로 발행해 보기"],
  },
  {
    name: "보건 / 생명과학",
    tags: ["health", "science", "human"],
    summary: "생명 현상과 건강 문제를 과학적으로 이해하고 예방과 치료에 연결하는 전공입니다.",
    knowledge: ["일반생물학", "인체생리학", "공중보건", "기초화학"],
    roadmap: ["생명과학 핵심 개념을 그림으로 정리하기", "건강 이슈 하나를 논문/기사로 비교하기", "실험 기록 양식을 익히기"],
  },
];

const customTagHints = [
  { match: ["코딩", "프로그래밍", "앱", "ai", "인공지능", "데이터"], tags: ["engineering", "data"] },
  { match: ["심리", "상담", "사람", "교육"], tags: ["human", "social"] },
  { match: ["디자인", "그림", "브랜드", "사용자"], tags: ["design", "creative"] },
  { match: ["영상", "콘텐츠", "글", "미디어"], tags: ["media", "creative"] },
  { match: ["경영", "창업", "마케팅", "돈", "경제"], tags: ["business", "social"] },
  { match: ["생명", "의학", "간호", "건강", "환경"], tags: ["health", "science"] },
];

function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [customText, setCustomText] = useState("");
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[Math.min(step, questions.length - 1)];
  const scores = useMemo(() => buildScores(answers), [answers]);
  const recommendations = useMemo(() => rankMajors(scores), [scores]);
  const topSignals = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const progress = Math.round((answers.length / questions.length) * 100);

  function chooseOption(option) {
    const nextAnswers = [
      ...answers,
      {
        question: currentQuestion.title,
        answer: option.label,
        tags: option.tags,
      },
    ];
    moveNext(nextAnswers);
  }

  function submitCustom(event) {
    event.preventDefault();
    const text = customText.trim();
    if (!text) return;

    const tags = inferTags(text);
    const nextAnswers = [
      ...answers,
      {
        question: currentQuestion.title,
        answer: text,
        tags,
      },
    ];
    setCustomText("");
    moveNext(nextAnswers);
  }

  function moveNext(nextAnswers) {
    setAnswers(nextAnswers);
    if (step >= questions.length - 1) {
      setShowResult(true);
      return;
    }
    setStep(step + 1);
  }

  function restart() {
    setStep(0);
    setAnswers([]);
    setCustomText("");
    setShowResult(false);
  }

  return (
    <ChatShell onRestart={restart}>
      {!showResult ? (
        <QuestionChat
          answers={answers}
          currentQuestion={currentQuestion}
          customText={customText}
          onCustomText={setCustomText}
          onOption={chooseOption}
          onResult={() => setShowResult(true)}
          onSubmit={submitCustom}
          progress={progress}
          topSignals={topSignals}
        />
      ) : (
        <ResultChat
          answers={answers}
          onRestart={restart}
          recommendations={recommendations}
          topSignals={topSignals}
        />
      )}
    </ChatShell>
  );
}

function ChatShell({ children, onRestart }) {
  return (
    <main className="min-h-screen bg-[#e9ecf7] text-[#333854]">
      <div className="flex min-h-screen w-[min(100vw,390px)] flex-col overflow-x-hidden bg-gradient-to-b from-[#fbfbff] via-[#f6f7ff] to-[#e8ebf8] shadow-[0_24px_80px_rgba(77,73,126,0.20)] sm:mx-auto">
        <header className="sticky top-0 z-10 flex items-center justify-between bg-white/92 px-5 py-3 backdrop-blur">
          <button
            className="text-xl font-extrabold tracking-normal text-[#6a55ff] focus:outline-none focus:ring-2 focus:ring-[#8c75ff]"
            onClick={onRestart}
            type="button"
          >
            과감
          </button>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#f7f7fb] px-3 py-1.5 text-xs font-bold text-[#595f7a] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#25d77b]" />
            AI 역방향 탐색
          </span>
        </header>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-[calc(env(safe-area-inset-bottom)+18px)] pt-5">
          {children}
        </div>
      </div>
    </main>
  );
}

function QuestionChat({
  answers,
  currentQuestion,
  customText,
  onCustomText,
  onOption,
  onResult,
  onSubmit,
  progress,
  topSignals,
}) {
  return (
    <>
      <AssistantBubble>
        <p>반갑습니다! 저는 매칭 가이드 '과감'입니다. 진짜 적성을 파악하기 위해 역방향 질문을 시작할게요.</p>
        <p className="mt-4">관심 있는 키워드를 선택해 주세요.</p>
        <TagRow tags={["코딩", "경제학", "디자인"]} />
      </AssistantBubble>

      {answers.map((answer, index) => (
        <UserBubble key={`${answer.question}-${index}`}>{answer.answer}</UserBubble>
      ))}

      <AssistantBubble>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold text-[#8d91a7]">질문 {answers.length + 1} / {questions.length}</span>
          <span className="text-xs font-bold text-[#6f5cff]">{progress}%</span>
        </div>
        <p className="mt-3 font-bold text-[#313650]">{currentQuestion.title}</p>
        <p className="mt-2 text-[#555b77]">{currentQuestion.helper}</p>
        {topSignals.length ? (
          <div className="mt-4">
            <p className="text-xs font-bold text-[#8d91a7]">현재 감지된 관심 신호</p>
            <TagRow tags={topSignals.slice(0, 3).map(([tag]) => tagLabels[tag])} />
          </div>
        ) : null}
      </AssistantBubble>

      <QuickReplyGroup options={currentQuestion.options} onOption={onOption} />

      <form className="rounded-2xl border border-white/80 bg-white/78 p-2 shadow-[0_10px_26px_rgba(95,91,154,0.10)]" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="custom-answer">
          직접 답변
        </label>
        <div className="flex min-w-0 items-center gap-2">
          <input
            className="min-h-10 flex-1 rounded-xl border border-[#e8e8f2] bg-[#fbfbff] px-3 py-2 text-sm text-[#333854] outline-none transition placeholder:text-[#a2a6ba] focus:border-[#8c75ff] focus:ring-2 focus:ring-[#ded8ff]"
            id="custom-answer"
            onChange={(event) => onCustomText(event.target.value)}
            placeholder="직접 답변 입력"
            type="text"
            value={customText}
          />
          <button
            className="shrink-0 rounded-xl bg-[#7d64ff] px-3 py-2 text-sm font-bold text-white shadow-[0_8px_18px_rgba(111,92,255,0.26)] transition hover:bg-[#6c55ee] disabled:cursor-not-allowed disabled:bg-[#c4c2d4] disabled:shadow-none"
            disabled={!customText.trim()}
            type="submit"
          >
            전송
          </button>
        </div>
      </form>

      {answers.length > 0 ? (
        <button
          className="mb-1 rounded-2xl border border-[#dcd8ff] bg-white/88 px-4 py-3 text-sm font-extrabold text-[#6f5cff] shadow-[0_10px_24px_rgba(95,91,154,0.12)] transition hover:border-[#8c75ff] hover:bg-white"
          onClick={onResult}
          type="button"
        >
          지금 추천 보기
        </button>
      ) : null}
    </>
  );
}

function ResultChat({ answers, recommendations, topSignals, onRestart }) {
  const primary = recommendations[0];

  return (
    <>
      {answers.slice(-3).map((answer, index) => (
        <UserBubble key={`${answer.question}-${index}`}>{answer.answer}</UserBubble>
      ))}

      <AssistantBubble>
        <p>지금까지의 답변을 바탕으로 가장 잘 맞는 전공 후보를 정리했어요.</p>

        <section className="mt-4 rounded-2xl bg-[#f8f7ff] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold text-[#6f5cff]">추천 전공 TOP 1</p>
              <h1 className="mt-1 text-lg font-extrabold leading-snug text-[#2f3350]">{primary.name}</h1>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#6f5cff] shadow-sm">
              {primary.fit}%
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#555b77]">{primary.summary}</p>
        </section>

        {topSignals.length ? (
          <section className="mt-4">
            <h2 className="text-sm font-extrabold text-[#313650]">강한 관심 신호</h2>
            <TagRow tags={topSignals.map(([tag, value]) => `${tagLabels[tag]} ${value}`)} />
          </section>
        ) : null}

        <CompactMajorList majors={recommendations.slice(0, 3)} />
        <CompactChecklist title="핵심 전공 지식" items={primary.knowledge} />
        <CompactChecklist title="4주 탐색 로드맵" items={primary.roadmap} ordered />
      </AssistantBubble>

      <button
        className="rounded-2xl bg-[#7d64ff] px-4 py-3 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(111,92,255,0.30)] transition hover:bg-[#6c55ee]"
        onClick={onRestart}
        type="button"
      >
        새 인터뷰 시작
      </button>
    </>
  );
}

function AssistantBubble({ children }) {
  return (
    <section className="max-w-[84%] rounded-[18px] rounded-tl-md border border-[#ececf4] bg-white px-4 py-3 text-sm leading-relaxed text-[#414762] shadow-[0_10px_28px_rgba(78,83,128,0.10)]">
      {children}
    </section>
  );
}

function UserBubble({ children }) {
  return (
    <div className="ml-auto max-w-[82%] rounded-[18px] rounded-tr-md bg-gradient-to-r from-[#8b70ff] to-[#7358f2] px-4 py-3 text-sm font-extrabold leading-relaxed text-white shadow-[0_12px_28px_rgba(111,92,255,0.32)]">
      {children}
    </div>
  );
}

function TagRow({ tags }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span className="rounded-lg bg-[#f0edff] px-2.5 py-1 text-xs font-extrabold text-[#6954ee]" key={tag}>
          #{tag}
        </span>
      ))}
    </div>
  );
}

function QuickReplyGroup({ options, onOption }) {
  return (
    <div className="ml-auto flex w-full max-w-[82%] flex-col items-end gap-2">
      {options.map((option) => (
        <button
          className="w-full rounded-2xl bg-gradient-to-r from-[#8b70ff] to-[#7358f2] px-4 py-3 text-left text-sm font-extrabold leading-relaxed text-white shadow-[0_10px_22px_rgba(111,92,255,0.28)] transition hover:translate-y-[-1px] hover:shadow-[0_14px_30px_rgba(111,92,255,0.34)] focus:outline-none focus:ring-2 focus:ring-[#b9afff]"
          key={option.label}
          onClick={() => onOption(option)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function CompactMajorList({ majors }) {
  return (
    <section className="mt-4">
      <h2 className="text-sm font-extrabold text-[#313650]">전공 후보 비교</h2>
      <div className="mt-2 space-y-2">
        {majors.map((major, index) => (
          <article className="rounded-2xl border border-[#ececf4] bg-[#fbfbff] p-3" key={major.name}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-extrabold text-[#8d91a7]">TOP {index + 1}</span>
              <span className="text-xs font-extrabold text-[#6f5cff]">{major.fit}%</span>
            </div>
            <h3 className="mt-1 text-sm font-extrabold text-[#313650]">{major.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function CompactChecklist({ title, items, ordered = false }) {
  return (
    <section className="mt-4">
      <h2 className="text-sm font-extrabold text-[#313650]">{title}</h2>
      <ol className="mt-2 space-y-2">
        {items.map((item, index) => (
          <li className="flex gap-2 rounded-2xl bg-[#f8f7ff] p-3 text-sm text-[#4e536d]" key={item}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-extrabold text-[#6f5cff] shadow-sm">
              {ordered ? index + 1 : "✓"}
            </span>
            <span className="pt-0.5">{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function buildScores(answers) {
  return answers.reduce((acc, answer) => {
    answer.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});
}

function rankMajors(scores) {
  const maxScore = Math.max(1, ...majors.map((major) => major.tags.reduce((sum, tag) => sum + (scores[tag] || 0), 0)));

  return majors
    .map((major) => {
      const raw = major.tags.reduce((sum, tag) => sum + (scores[tag] || 0), 0);
      return {
        ...major,
        fit: Math.max(38, Math.round((raw / maxScore) * 100)),
      };
    })
    .sort((a, b) => b.fit - a.fit);
}

function inferTags(text) {
  const lower = text.toLowerCase();
  const found = customTagHints.flatMap((hint) =>
    hint.match.some((keyword) => lower.includes(keyword.toLowerCase())) ? hint.tags : [],
  );

  return found.length ? [...new Set(found)] : ["human", "social"];
}

export default App;
