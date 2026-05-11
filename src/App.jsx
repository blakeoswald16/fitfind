import { useState, useMemo } from "react";

const C = {
  bg: "#212121",
  surface: "#2c2c2c",
  card: "#303030",
  border: "#3d3d3d",
  borderLight: "#484848",
  textPrimary: "#f0f0f0",
  textSecondary: "#a8a8a8",
  textMuted: "#6b6b6b",
  accent: "#C8FF00",
  accentDim: "rgba(200,255,0,0.12)",
  accentBorder: "rgba(200,255,0,0.35)",
};

const TRAINERS = [
  { id: 1, name: "Maya Chen", handle: "@mayalifts", specialty: "Strength & Powerlifting", niche: "strength", bio: "NSCA-certified coach. Helped 2,000+ women build their first deadlift. No fluff, just results.", platforms: { instagram: "284K", youtube: "91K", tiktok: "610K" }, price: "$$", rating: 4.9, reviews: 312, location: "Los Angeles, CA", tags: ["Women's Lifting", "Beginner Friendly", "Powerlifting"], coachingMode: "online", style: "tough love", img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80" },
  { id: 2, name: "Jordan Reyes", handle: "@jordanfitpro", specialty: "HIIT & Fat Loss", niche: "hiit", bio: "Former D1 athlete. My 30-day shred programs have been downloaded over 100K times.", platforms: { instagram: "512K", tiktok: "1.2M" }, price: "$", rating: 4.7, reviews: 890, location: "Miami, FL", tags: ["Fat Loss", "HIIT", "Quick Workouts"], coachingMode: "online", style: "accountability", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80" },
  { id: 3, name: "Priya Nair", handle: "@priyawellness", specialty: "Yoga & Mobility", niche: "yoga", bio: "500-hr RYT. Blending Iyengar tradition with modern mobility science. Chronic pain welcome.", platforms: { instagram: "178K", youtube: "220K" }, price: "$$", rating: 4.95, reviews: 201, location: "Austin, TX", tags: ["Yoga", "Mobility", "Chronic Pain", "Beginner Friendly"], coachingMode: "both", style: "holistic", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80" },
  { id: 4, name: "Marcus Webb", handle: "@marcusbuildz", specialty: "Bodybuilding & Hypertrophy", niche: "strength", bio: "IFBB pro. 15 years on stage. Now coaching serious athletes who want to compete or just look the part.", platforms: { instagram: "390K", youtube: "155K", tiktok: "480K" }, price: "$$$", rating: 4.8, reviews: 147, location: "Las Vegas, NV", tags: ["Bodybuilding", "Competition Prep", "Hypertrophy"], coachingMode: "online", style: "tough love", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80" },
  { id: 5, name: "Lena Kowalski", handle: "@lenarunswild", specialty: "Running & Endurance", niche: "cardio", bio: "Olympic Trials qualifier. Coaching runners from 5K to 100-milers. Heart rate nerd.", platforms: { instagram: "93K", youtube: "44K" }, price: "$$", rating: 4.85, reviews: 88, location: "Boulder, CO", tags: ["Running", "Endurance", "Marathon", "Trail"], coachingMode: "both", style: "data-driven", img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80" },
  { id: 6, name: "Darius Kim", handle: "@dariusmoves", specialty: "Calisthenics & Movement", niche: "calisthenics", bio: "From couch to handstand in 12 months. I teach body control no gym required.", platforms: { instagram: "260K", tiktok: "880K", youtube: "130K" }, price: "$", rating: 4.75, reviews: 530, location: "New York, NY", tags: ["Calisthenics", "No Equipment", "Handstands", "Flexibility"], coachingMode: "online", style: "supportive", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" },
  { id: 7, name: "Sofia Alvarez", handle: "@sofianutrition", specialty: "Nutrition & Weight Loss", niche: "nutrition", bio: "RD + CPT. No crash diets, no supplements. Just sustainable eating that works with your life.", platforms: { instagram: "144K", tiktok: "320K" }, price: "$$", rating: 4.9, reviews: 276, location: "Chicago, IL", tags: ["Nutrition", "Weight Loss", "Sustainable", "Meal Planning"], coachingMode: "both", style: "holistic", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80" },
  { id: 8, name: "Tyler Brooks", handle: "@tylerathlete", specialty: "Athletic Performance", niche: "performance", bio: "S&C coach for pro athletes. Now bringing elite sports science to everyday people.", platforms: { instagram: "205K", youtube: "98K" }, price: "$$$", rating: 4.85, reviews: 164, location: "Seattle, WA", tags: ["Athletic Performance", "Speed", "Agility", "Sports Science"], coachingMode: "both", style: "data-driven", img: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=400&q=80" },
  { id: 9, name: "Zoe Pham", handle: "@zoepilates", specialty: "Pilates & Core", niche: "yoga", bio: "Comprehensively certified STOTT instructor. Postpartum and back pain my specialty.", platforms: { instagram: "87K", youtube: "62K" }, price: "$$", rating: 4.95, reviews: 98, location: "San Francisco, CA", tags: ["Pilates", "Core", "Postpartum", "Back Pain"], coachingMode: "both", style: "supportive", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80" },
  { id: 10, name: "Rex Tanner", handle: "@rextannercf", specialty: "CrossFit & Functional Fitness", niche: "hiit", bio: "Level 3 CF coach and affiliate owner. I turn regular people into athletes through constantly varied movement.", platforms: { instagram: "176K", youtube: "55K", tiktok: "290K" }, price: "$$", rating: 4.75, reviews: 203, location: "Denver, CO", tags: ["CrossFit", "Functional Fitness", "WODs", "Community"], coachingMode: "both", style: "tough love", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" },
  { id: 11, name: "Amara Osei", handle: "@amaraboxfit", specialty: "Boxing & Combat Fitness", niche: "hiit", bio: "Former pro boxer turned coach. My clients lose weight, gain confidence, and learn to actually throw a punch.", platforms: { instagram: "321K", tiktok: "740K" }, price: "$", rating: 4.8, reviews: 415, location: "Philadelphia, PA", tags: ["Boxing", "Combat Fitness", "Confidence", "Fat Loss"], coachingMode: "both", style: "tough love", img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&q=80" },
  { id: 12, name: "Claire Fontaine", handle: "@claireprenatal", specialty: "Pre & Postnatal Fitness", niche: "yoga", bio: "Certified pre/postnatal specialist with 10 years experience. Safe, effective training for every trimester and beyond.", platforms: { instagram: "112K", youtube: "88K" }, price: "$$", rating: 4.98, reviews: 142, location: "Portland, OR", tags: ["Prenatal", "Postpartum", "Core Restore", "Safe Pregnancy"], coachingMode: "online", style: "supportive", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80" },
  { id: 13, name: "Gene Harlow", handle: "@genefit55plus", specialty: "Senior & Longevity Fitness", niche: "performance", bio: "72 years old and still deadlifting. I coach adults 55+ on building strength, balance, and decades more vitality.", platforms: { instagram: "64K", youtube: "110K" }, price: "$", rating: 4.95, reviews: 77, location: "Scottsdale, AZ", tags: ["Senior Fitness", "Longevity", "Balance", "55+"], coachingMode: "both", style: "supportive", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" },
  { id: 14, name: "Bianca Torres", handle: "@biancadancefit", specialty: "Dance Fitness & Zumba", niche: "cardio", bio: "Master Zumba instructor with 500K community members. If you hate the gym, come dance with us instead.", platforms: { instagram: "498K", tiktok: "1.8M", youtube: "210K" }, price: "$", rating: 4.7, reviews: 1240, location: "San Antonio, TX", tags: ["Zumba", "Dance", "Cardio", "Beginner Friendly"], coachingMode: "online", style: "supportive", img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&q=80" },
  { id: 15, name: "Ethan Yoo", handle: "@ethankettlebell", specialty: "Kettlebell & Functional Strength", niche: "strength", bio: "StrongFirst certified. Kettlebells are the most efficient tool in fitness. I'll prove it to you in 30 days.", platforms: { instagram: "143K", youtube: "67K" }, price: "$$", rating: 4.85, reviews: 189, location: "Minneapolis, MN", tags: ["Kettlebell", "Functional Strength", "Minimalist", "Home Workouts"], coachingMode: "online", style: "data-driven", img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&q=80" },
  { id: 16, name: "Naomi Adkins", handle: "@naomistretches", specialty: "Flexibility & Mobility Coaching", niche: "yoga", bio: "Former competitive gymnast. I help stiff adults rediscover what their body is actually capable of.", platforms: { instagram: "234K", tiktok: "920K", youtube: "77K" }, price: "$", rating: 4.8, reviews: 564, location: "Nashville, TN", tags: ["Flexibility", "Stretching", "Splits", "Desk Worker Recovery"], coachingMode: "online", style: "holistic", img: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=400&q=80" },
  { id: 17, name: "Cole Andersen", handle: "@coleolympiclifts", specialty: "Olympic Weightlifting", niche: "strength", bio: "Team USA development coach. I take athletes from squat rack to the snatch platform with technical precision.", platforms: { instagram: "88K", youtube: "120K" }, price: "$$$", rating: 4.9, reviews: 61, location: "Colorado Springs, CO", tags: ["Olympic Lifting", "Snatch", "Clean & Jerk", "Technical"], coachingMode: "both", style: "data-driven", img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80" },
  { id: 18, name: "Jade Williams", handle: "@jadementalfit", specialty: "Mindful Fitness & Mental Health", niche: "yoga", bio: "Licensed therapist + CPT. I specialize in using exercise as medicine for anxiety, depression, and burnout.", platforms: { instagram: "155K", youtube: "93K" }, price: "$$", rating: 4.97, reviews: 208, location: "Atlanta, GA", tags: ["Mental Health", "Mindful Fitness", "Anxiety", "Burnout Recovery"], coachingMode: "online", style: "holistic", img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&q=80" },
  { id: 19, name: "Marco Bellini", handle: "@marcotricoach", specialty: "Triathlon & Endurance Sports", niche: "cardio", bio: "Ironman finisher 11 times over. I coach age-groupers from sprint distance to full Ironman in 12-month cycles.", platforms: { instagram: "71K", youtube: "48K" }, price: "$$$", rating: 4.88, reviews: 94, location: "Tucson, AZ", tags: ["Triathlon", "Ironman", "Cycling", "Swimming"], coachingMode: "online", style: "data-driven", img: "https://images.unsplash.com/photo-1530143311094-34d807799e8f?w=400&q=80" },
  { id: 20, name: "Fatima Hassan", handle: "@fatimaplanteats", specialty: "Plant-Based Nutrition & Fitness", niche: "nutrition", bio: "RD specializing in plant-based performance. You don't need meat to build muscle. Let me show you.", platforms: { instagram: "199K", tiktok: "560K" }, price: "$$", rating: 4.82, reviews: 317, location: "Oakland, CA", tags: ["Vegan", "Plant-Based", "Sports Nutrition", "Muscle Building"], coachingMode: "online", style: "holistic", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
  { id: 21, name: "Derek Okafor", handle: "@derekmobility", specialty: "Injury Recovery & Rehab Fitness", niche: "yoga", bio: "DPT + strength coach. I bridge the gap between physical therapy and the gym floor so you stop getting reinjured.", platforms: { instagram: "117K", youtube: "84K" }, price: "$$$", rating: 4.93, reviews: 135, location: "Houston, TX", tags: ["Injury Recovery", "Rehab", "Pain-Free Movement", "Return to Sport"], coachingMode: "both", style: "data-driven", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80" },
  { id: 22, name: "Sierra Monroe", handle: "@sierracycleco", specialty: "Indoor Cycling & Cardio", niche: "cardio", bio: "Master spin instructor with 8 years on the bike. I make 45 minutes fly by and leave you dripping.", platforms: { instagram: "88K", tiktok: "430K" }, price: "$", rating: 4.72, reviews: 389, location: "Los Angeles, CA", tags: ["Cycling", "Spin", "Cardio", "Music-Driven"], coachingMode: "online", style: "supportive", img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&q=80" },
  { id: 23, name: "Raj Mehta", handle: "@rajgolffitness", specialty: "Golf Performance & Mobility", niche: "performance", bio: "Titleist performance specialist working with amateur to tour-level golfers. Your body is your biggest swing flaw.", platforms: { instagram: "52K", youtube: "38K" }, price: "$$$", rating: 4.87, reviews: 49, location: "Scottsdale, AZ", tags: ["Golf Fitness", "Mobility", "Sport-Specific", "Rotational Power"], coachingMode: "both", style: "data-driven", img: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&q=80" },
  { id: 24, name: "Nadia Volkov", handle: "@nadiasurffit", specialty: "Surf & Outdoor Athletic Training", niche: "performance", bio: "Former pro surfer. I train water sports athletes and outdoor adventurers with functional ocean-inspired fitness.", platforms: { instagram: "163K", tiktok: "380K" }, price: "$$", rating: 4.78, reviews: 171, location: "San Diego, CA", tags: ["Surf Fitness", "Outdoor", "Balance", "Upper Body"], coachingMode: "both", style: "holistic", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
  { id: 25, name: "Antoine Dubois", handle: "@antoinemacros", specialty: "Body Recomposition & Macros", niche: "nutrition", bio: "CSCS + precision nutrition certified. Body recomp is an art. I help clients lose fat and build muscle simultaneously.", platforms: { instagram: "241K", youtube: "109K", tiktok: "615K" }, price: "$$", rating: 4.84, reviews: 422, location: "Dallas, TX", tags: ["Body Recomp", "Macros", "Cutting", "Bulking"], coachingMode: "online", style: "data-driven", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80" },
];

const QUIZ_STEPS = [
  { id: "goal", question: "What's your primary fitness goal?", emoji: "🎯", options: ["Lose weight & burn fat", "Build muscle & get stronger", "Improve endurance & cardio", "Flexibility, mobility & recovery", "Athletic performance & sport", "Nutrition & healthy eating habits", "General wellness & stress relief"] },
  { id: "experience", question: "What's your experience level?", emoji: "📊", options: ["Complete beginner (just starting out)", "Some experience (occasional gym-goer)", "Intermediate (consistent 1-2 years)", "Advanced (3+ years, serious training)"] },
  { id: "days", question: "How many days per week can you commit?", emoji: "📅", options: ["1-2 days (easy schedule)", "3-4 days (moderate commitment)", "5-6 days (high commitment)", "Every day (I'm all in)"] },
  { id: "budget", question: "What's your monthly coaching budget?", emoji: "💰", options: ["Budget-friendly ($50 or less)", "Mid-range ($50-150/month)", "Premium ($150+/month)", "Price isn't a factor"] },
  { id: "mode", question: "How do you want to train?", emoji: "📍", options: ["Fully online (remote coaching)", "In-person only (local trainer)", "Either works for me"] },
  { id: "style", question: "What coaching style gets the best out of you?", emoji: "🧠", options: ["Tough love — push me hard and hold me accountable", "Supportive & encouraging — keep me motivated", "Science-based — give me the data and the why", "Holistic — mind, body, and lifestyle together"] },
  { id: "special", question: "Any specific needs or focus areas?", emoji: "⚡", multi: true, options: ["No equipment / home workouts", "Competition or event prep", "Postpartum or injury recovery", "Sport-specific training", "Chronic pain or health conditions", "No special requirements"] },
];

const PLATFORM_ICONS = {
  instagram: { label: "IG", color: "#E1306C" },
  youtube: { label: "YT", color: "#FF0000" },
  tiktok: { label: "TT", color: "#69C9D0" },
};

const NICHES = ["All", "strength", "hiit", "yoga", "cardio", "calisthenics", "nutrition", "performance"];
const PRICES = ["All", "$", "$$", "$$$"];
const PLATFORMS_FILTER = ["All", "instagram", "youtube", "tiktok"];

function StarRating({ rating }) {
  return (
    <span style={{ color: C.accent, fontSize: "12px" }}>
      {"★".repeat(Math.floor(rating))}
      <span style={{ color: C.borderLight }}>{"★".repeat(5 - Math.floor(rating))}</span>
    </span>
  );
}

function PlatformBadge({ platform, count }) {
  const p = PLATFORM_ICONS[platform];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "rgba(255,255,255,0.06)", border: `1px solid ${C.border}`, borderRadius: "20px", padding: "3px 8px", fontSize: "11px", color: C.textSecondary }}>
      <span style={{ color: p.color, fontWeight: 700, fontSize: "10px" }}>{p.label}</span>{count}
    </span>
  );
}

function TrainerCard({ trainer, onClick, matchReason }) {
  return (
    <div onClick={() => onClick(trainer)}
      style={{ background: C.card, border: `1px solid ${matchReason ? C.accentBorder : C.border}`, borderRadius: "16px", overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: matchReason ? `0 0 20px ${C.accentDim}` : "none" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.4)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = matchReason ? `0 0 20px ${C.accentDim}` : "none"; }}>
      <div style={{ position: "relative", height: "200px", overflow: "hidden", background: C.surface }}>
        <img src={trainer.img} alt={trainer.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={e => { e.target.style.display = "none"; }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.card} 0%, transparent 55%)` }} />
        <div style={{ position: "absolute", top: "12px", right: "12px", background: C.accent, color: "#000", fontWeight: 800, fontSize: "12px", padding: "3px 10px", borderRadius: "20px" }}>{trainer.price}</div>
        {matchReason && <div style={{ position: "absolute", top: "12px", left: "12px", background: C.accentDim, border: `1px solid ${C.accentBorder}`, color: C.accent, fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "20px", letterSpacing: "0.5px" }}>✦ MATCHED</div>}
      </div>
      <div style={{ padding: "16px" }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "22px", color: C.textPrimary, letterSpacing: "1px", lineHeight: 1 }}>{trainer.name}</div>
        <div style={{ fontSize: "12px", color: C.textMuted, marginBottom: "6px" }}>{trainer.handle} · {trainer.location}</div>
        <div style={{ fontSize: "12px", fontWeight: 600, color: C.accent, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{trainer.specialty}</div>
        {matchReason
          ? <div style={{ fontSize: "12px", color: C.textSecondary, lineHeight: 1.55, marginBottom: "10px", padding: "8px 10px", background: C.accentDim, borderRadius: "8px", border: `1px solid ${C.accentBorder}` }}>{matchReason}</div>
          : <p style={{ fontSize: "13px", color: C.textMuted, lineHeight: 1.55, marginBottom: "12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{trainer.bio}</p>
        }
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "10px" }}>
          {Object.entries(trainer.platforms).map(([p, count]) => <PlatformBadge key={p} platform={p} count={count} />)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <StarRating rating={trainer.rating} />
          <span style={{ fontSize: "12px", color: C.textMuted }}>{trainer.rating} ({trainer.reviews})</span>
        </div>
      </div>
    </div>
  );
}

function Modal({ trainer, onClose }) {
  if (!trainer) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.surface, borderRadius: "20px", border: `1px solid ${C.border}`, maxWidth: "560px", width: "100%", overflow: "hidden", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ position: "relative", height: "260px", background: C.card }}>
          <img src={trainer.img} alt={trainer.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.surface} 0%, transparent 50%)` }} />
          <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>
        <div style={{ padding: "24px" }}>
          <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "36px", color: C.textPrimary, letterSpacing: "1px" }}>{trainer.name}</div>
          <div style={{ fontSize: "13px", color: C.textMuted, marginBottom: "4px" }}>{trainer.handle} · {trainer.location}</div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: C.accent, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>{trainer.specialty}</div>
          <p style={{ fontSize: "14px", color: C.textSecondary, lineHeight: 1.7, marginBottom: "20px" }}>{trainer.bio}</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
            {trainer.tags.map(t => <span key={t} style={{ background: C.accentDim, color: C.accent, border: `1px solid ${C.accentBorder}`, borderRadius: "20px", padding: "4px 12px", fontSize: "12px" }}>{t}</span>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "24px" }}>
            {Object.entries(trainer.platforms).map(([p, count]) => {
              const icon = PLATFORM_ICONS[p];
              return <div key={p} style={{ background: C.card, borderRadius: "12px", padding: "12px", textAlign: "center", border: `1px solid ${C.border}` }}>
                <div style={{ color: icon.color, fontWeight: 800, fontSize: "11px", marginBottom: "4px" }}>{icon.label}</div>
                <div style={{ color: C.textPrimary, fontWeight: 700, fontSize: "16px", fontFamily: "'Bebas Neue', cursive", letterSpacing: "1px" }}>{count}</div>
                <div style={{ color: C.textMuted, fontSize: "10px" }}>followers</div>
              </div>;
            })}
          </div>
          <button style={{ width: "100%", background: C.accent, color: "#000", border: "none", borderRadius: "12px", padding: "14px", fontWeight: 800, fontSize: "15px", cursor: "pointer" }}>View Full Profile →</button>
        </div>
      </div>
    </div>
  );
}

function QuizModal({ onClose, onResults }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const current = QUIZ_STEPS[step];
  const isLast = step === QUIZ_STEPS.length - 1;
  const selected = answers[current.id] || [];

  function toggleOption(opt) {
    if (current.multi) {
      setAnswers(prev => { const cur = prev[current.id] || []; return { ...prev, [current.id]: cur.includes(opt) ? cur.filter(o => o !== opt) : [...cur, opt] }; });
    } else {
      setAnswers(prev => ({ ...prev, [current.id]: [opt] }));
    }
  }

  async function handleFinish() {
    setLoading(true); setError(null);
    try {
      const prompt = `You are a fitness coach matchmaker. Based on a user's quiz answers, match them to the best trainers and explain why each fits.

USER ANSWERS:
${Object.entries(answers).map(([k, v]) => `- ${k}: ${v.join(", ")}`).join("\n")}

TRAINERS:
${TRAINERS.map(t => `ID:${t.id} | ${t.name} | ${t.specialty} | Price:${t.price} | Mode:${t.coachingMode} | Style:${t.style} | Tags:${t.tags.join(", ")}`).join("\n")}

Return ONLY valid JSON, no markdown, no preamble:
{"matches":[{"id":1,"reason":"2-sentence personalized match explanation"},{"id":2,"reason":"..."},{"id":3,"reason":"..."}]}

Pick top 3. Make reasons feel personal and specific to the user's answers.`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] })
      });
      const data = await res.json();
      const text = data.content.map(b => b.text || "").join("").replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(text);
      const matches = parsed.matches.map(m => ({ trainer: TRAINERS.find(t => t.id === m.id), reason: m.reason })).filter(m => m.trainer);
      onResults(matches); onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally { setLoading(false); }
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "20px" }}>
      <div style={{ background: C.surface, borderRadius: "24px", border: `1px solid ${C.border}`, maxWidth: "560px", width: "100%", overflow: "hidden" }}>
        <div style={{ height: "3px", background: C.card }}>
          <div style={{ height: "100%", width: `${(step / QUIZ_STEPS.length) * 100}%`, background: C.accent, transition: "width 0.4s ease" }} />
        </div>
        <div style={{ padding: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <span style={{ fontSize: "12px", color: C.textMuted, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>Step {step + 1} of {QUIZ_STEPS.length}</span>
            <button onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: "20px" }}>×</button>
          </div>
          <div style={{ fontSize: "32px", marginBottom: "10px" }}>{current.emoji}</div>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "26px", color: C.textPrimary, letterSpacing: "1px", lineHeight: 1.2, marginBottom: current.multi ? "4px" : "18px" }}>{current.question}</h2>
          {current.multi && <p style={{ fontSize: "12px", color: C.textMuted, marginBottom: "14px" }}>Select all that apply</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
            {current.options.map(opt => {
              const isSel = selected.includes(opt);
              return (
                <button key={opt} onClick={() => toggleOption(opt)} style={{ background: isSel ? C.accentDim : C.card, border: `1px solid ${isSel ? C.accent : C.border}`, borderRadius: "12px", padding: "13px 16px", color: isSel ? C.accent : C.textSecondary, cursor: "pointer", textAlign: "left", fontSize: "14px", fontWeight: isSel ? 600 : 400, transition: "all 0.15s", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "18px", height: "18px", border: `2px solid ${isSel ? C.accent : C.borderLight}`, borderRadius: current.multi ? "4px" : "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: isSel ? C.accent : "transparent" }}>
                    {isSel && <span style={{ color: "#000", fontSize: "11px", fontWeight: 900 }}>✓</span>}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
          {error && <p style={{ color: "#ff7070", fontSize: "13px", marginBottom: "14px" }}>{error}</p>}
          <div style={{ display: "flex", gap: "10px" }}>
            {step > 0 && <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, background: C.card, color: C.textSecondary, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "14px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>← Back</button>}
            <button onClick={isLast ? handleFinish : () => setStep(s => s + 1)} disabled={selected.length === 0 || loading}
              style={{ flex: 2, background: selected.length > 0 && !loading ? C.accent : C.card, color: selected.length > 0 && !loading ? "#000" : C.textMuted, border: "none", borderRadius: "12px", padding: "14px", cursor: selected.length > 0 && !loading ? "pointer" : "default", fontSize: "14px", fontWeight: 800, transition: "all 0.15s" }}>
              {loading ? "Finding your matches..." : isLast ? "Find My Matches ✦" : "Continue →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchResults({ matches, onBrowseAll, onRetake }) {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <div style={{ textAlign: "center", padding: "40px 32px 28px" }}>
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>✦</div>
        <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(36px, 6vw, 52px)", color: C.accent, letterSpacing: "2px", margin: "0 0 8px" }}>YOUR MATCHES</h2>
        <p style={{ color: C.textMuted, fontSize: "14px", maxWidth: "380px", margin: "0 auto 12px" }}>Based on your goals, these coaches are your best fit.</p>
        <button onClick={onRetake} style={{ background: "none", border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: "20px", padding: "6px 16px", fontSize: "12px", cursor: "pointer" }}>Retake Quiz</button>
      </div>
      <div style={{ padding: "0 32px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
        {matches.map(({ trainer, reason }) => <TrainerCard key={trainer.id} trainer={trainer} onClick={setSelected} matchReason={reason} />)}
      </div>
      <div style={{ textAlign: "center", padding: "12px 32px 48px" }}>
        <button onClick={onBrowseAll} style={{ background: C.card, color: C.textSecondary, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "12px 28px", fontSize: "14px", cursor: "pointer", fontWeight: 600 }}>Browse All Trainers →</button>
      </div>
      <Modal trainer={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default function FitFind() {
  const [search, setSearch] = useState("");
  const [niche, setNiche] = useState("All");
  const [price, setPrice] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [view, setView] = useState("browse");
  const [matchResults, setMatchResults] = useState(null);

  const filtered = useMemo(() => TRAINERS.filter(t => {
    const s = search.toLowerCase();
    const matchSearch = !s || t.name.toLowerCase().includes(s) || t.specialty.toLowerCase().includes(s) || t.tags.some(tag => tag.toLowerCase().includes(s));
    return matchSearch && (niche === "All" || t.niche === niche) && (price === "All" || t.price === price) && (platform === "All" || t.platforms[platform]);
  }), [search, niche, price, platform]);

  const FilterBtn = ({ label, active, onClick }) => (
    <button onClick={onClick} style={{ background: active ? C.accent : "transparent", color: active ? "#000" : C.textMuted, border: `1px solid ${active ? C.accent : C.border}`, borderRadius: "20px", padding: "6px 14px", fontSize: "12px", cursor: "pointer", fontWeight: active ? 700 : 400, transition: "all 0.15s", textTransform: "capitalize", whiteSpace: "nowrap" }}>{label}</button>
  );

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', sans-serif", color: C.textPrimary }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: `rgba(33,33,33,0.96)`, backdropFilter: "blur(12px)", zIndex: 100, flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
          <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", color: C.accent, letterSpacing: "2px" }}>FITFIND</span>
          <span style={{ fontSize: "12px", color: C.textMuted }}>discover your coach</span>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          {view === "results" && <button onClick={() => setView("browse")} style={{ background: "none", border: `1px solid ${C.border}`, color: C.textSecondary, borderRadius: "10px", padding: "8px 14px", fontSize: "13px", cursor: "pointer" }}>← All Trainers</button>}
          <div style={{ position: "relative" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search trainers..." style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "10px 16px 10px 40px", color: C.textPrimary, fontSize: "13px", width: "220px", outline: "none" }} />
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", color: C.textMuted }}>🔍</span>
          </div>
          <button onClick={() => setShowQuiz(true)} style={{ background: C.accent, color: "#000", border: "none", borderRadius: "10px", padding: "10px 18px", fontSize: "13px", fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>✦ Find My Match</button>
        </div>
      </div>

      {view === "results" && matchResults ? (
        <MatchResults matches={matchResults} onBrowseAll={() => setView("browse")} onRetake={() => { setMatchResults(null); setShowQuiz(true); }} />
      ) : (
        <>
          <div style={{ padding: "48px 32px 32px", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(44px, 7vw, 76px)", color: C.textPrimary, letterSpacing: "3px", lineHeight: 1, margin: "0 0 12px" }}>
              EVERY ONLINE TRAINER.<br /><span style={{ color: C.accent }}>ONE PLACE.</span>
            </h1>
            <p style={{ color: C.textMuted, fontSize: "15px", maxWidth: "420px", margin: "0 auto 24px" }}>Browse {TRAINERS.length} coaches across Instagram, YouTube, and TikTok.</p>
            <button onClick={() => setShowQuiz(true)} style={{ background: C.accent, color: "#000", border: "none", borderRadius: "12px", padding: "14px 28px", fontSize: "15px", fontWeight: 800, cursor: "pointer" }}>✦ Take the Matching Quiz</button>
          </div>

          <div style={{ padding: "0 32px 24px", display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-end", borderBottom: `1px solid ${C.border}` }}>
            {[["Specialty", NICHES, niche, setNiche], ["Price", PRICES, price, setPrice]].map(([label, opts, val, setter]) => (
              <div key={label}>
                <div style={{ fontSize: "10px", color: C.textMuted, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>{label}</div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {opts.map(o => <FilterBtn key={o} label={o} active={val === o} onClick={() => setter(o)} />)}
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontSize: "10px", color: C.textMuted, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Platform</div>
              <div style={{ display: "flex", gap: "6px" }}>
                {PLATFORMS_FILTER.map(p => <FilterBtn key={p} label={p === "All" ? "All" : PLATFORM_ICONS[p].label} active={platform === p} onClick={() => setPlatform(p)} />)}
              </div>
            </div>
          </div>

          <div style={{ padding: "16px 32px 4px", fontSize: "13px", color: C.textMuted }}>{filtered.length} trainer{filtered.length !== 1 ? "s" : ""} found</div>
          <div style={{ padding: "16px 32px 60px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {filtered.length === 0
              ? <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px", color: C.textMuted }}><div style={{ fontSize: "48px", marginBottom: "12px" }}>🏋️</div><div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "24px" }}>NO TRAINERS FOUND</div></div>
              : filtered.map(t => <TrainerCard key={t.id} trainer={t} onClick={setSelected} />)
            }
          </div>
          <Modal trainer={selected} onClose={() => setSelected(null)} />
        </>
      )}
      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} onResults={res => { setMatchResults(res); setView("results"); }} />}
    </div>
  );
}