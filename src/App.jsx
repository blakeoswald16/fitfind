import { useState, useMemo } from "react";

const C = {
  bg: "#212121", surface: "#2c2c2c", card: "#303030", border: "#3d3d3d",
  borderLight: "#484848", textPrimary: "#f0f0f0", textSecondary: "#a8a8a8",
  textMuted: "#6b6b6b", accent: "#C8FF00", accentDim: "rgba(200,255,0,0.12)",
  accentBorder: "rgba(200,255,0,0.35)",
};

const TRAINERS = [
  {
    id: 1, name: "Maya Chen", handle: "@mayalifts", specialty: "Strength & Powerlifting", niche: "strength",
    tagline: "The coach who turned 2,000+ women into lifters.",
    bio: "I'm Maya, an NSCA-certified strength coach based in LA. I started lifting at 22 after years of cardio-only workouts left me feeling weak and burned out. I fell in love with the barbell and never looked back. Today I specialize in helping women build their first serious squat, bench, and deadlift — no fluff, no gimmicks, just progressive overload and real coaching.",
    experience: "8 years coaching", responseTime: "Under 4 hours",
    platforms: { instagram: "284K", youtube: "91K", tiktok: "610K" },
    price: "$$", priceRange: "$100–$175/mo",
    pricing: [
      { tier: "Starter", price: "$100/mo", includes: ["Custom 4-day program", "Weekly check-ins", "Form video review (2x/mo)", "Nutrition guidelines"] },
      { tier: "Premium", price: "$150/mo", includes: ["Custom 5-day program", "Daily messaging access", "Weekly video call", "Full macro coaching", "Priority response"] },
      { tier: "Elite", price: "$175/mo", includes: ["Everything in Premium", "Meet prep (if applicable)", "Monthly deload planning", "1-on-1 strategy sessions"] },
    ],
    certifications: ["NSCA-CSCS", "USA Powerlifting Coach", "Precision Nutrition L1"],
    rating: 4.9, reviews: 312, location: "Los Angeles, CA",
    tags: ["Women's Lifting", "Beginner Friendly", "Powerlifting"],
    coachingMode: "online", style: "tough love",
    coachingIncludes: ["Custom training programs", "Form video analysis", "Nutrition guidance", "Check-in calls", "Access to private client app"],
    successStories: [
      { name: "Jordan T.", result: "Hit her first 200lb deadlift in 6 months", quote: "Maya completely changed how I see the gym. I went from scared of barbells to competing in my first meet." },
      { name: "Priya M.", result: "Lost 22 lbs while gaining visible muscle", quote: "The programming is hard but smart. She always knows when to push and when to back off." },
      { name: "Cassie R.", result: "Recovered from gym anxiety, now trains 5x/week", quote: "Best investment I've ever made. She explained the why behind everything." },
    ],
    reviewsList: [
      { author: "Lauren B.", rating: 5, text: "Maya is the real deal. Her programming is thoughtful and she actually watches your form videos and gives detailed feedback." },
      { author: "Tina K.", rating: 5, text: "I've had 3 coaches before Maya. None of them came close to her level of expertise and communication." },
      { author: "Sam D.", rating: 4, text: "Great coach, sometimes takes a day to reply but always thorough when she does." },
    ],
    img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80",
  },
  {
    id: 2, name: "Jordan Reyes", handle: "@jordanfitpro", specialty: "HIIT & Fat Loss", niche: "hiit",
    tagline: "30 days to a body that earns it.",
    bio: "Former D1 soccer athlete turned fat loss coach. I know what it takes to perform at the highest level, and I know what happens when the structure disappears after college. I gained 35 lbs in two years before rebuilding from scratch. Now I help everyday people cut through the noise with short, efficient programs that actually work without spending 2 hours in the gym.",
    experience: "6 years coaching", responseTime: "Same day",
    platforms: { instagram: "512K", tiktok: "1.2M" },
    price: "$", priceRange: "$45–$80/mo",
    pricing: [
      { tier: "Self-Guided", price: "$45/mo", includes: ["Monthly program download", "Exercise video library", "Private community access"] },
      { tier: "Coached", price: "$80/mo", includes: ["New program every 4 weeks", "Bi-weekly check-ins", "Nutrition tracking support", "Community + direct messaging"] },
    ],
    certifications: ["ACE-CPT", "NASM Nutrition Coach", "TRX Certified"],
    rating: 4.7, reviews: 890, location: "Miami, FL",
    tags: ["Fat Loss", "HIIT", "Quick Workouts"],
    coachingMode: "online", style: "accountability",
    coachingIncludes: ["Monthly HIIT programming", "Cardio protocols", "Nutrition tracking guidance", "Private community", "Accountability check-ins"],
    successStories: [
      { name: "Mike S.", result: "Down 40 lbs in 5 months", quote: "The workouts are 30-45 minutes but I've never sweat this much in my life. It works." },
      { name: "Danielle F.", result: "Went from a size 14 to a size 8", quote: "Jordan holds you accountable without making you feel bad. Perfect balance." },
      { name: "Chris W.", result: "Completed first 5K after years of no cardio", quote: "Started just wanting to lose weight and ended up falling in love with fitness." },
    ],
    reviewsList: [
      { author: "Rachel M.", rating: 5, text: "The programs are incredibly well structured and the community he's built keeps you going on the hard days." },
      { author: "David L.", rating: 5, text: "Affordable, effective, and actually enjoyable. I didn't think those three things could exist together." },
      { author: "Aisha P.", rating: 4, text: "Good value for the price. Would love more personalization but the programs are solid." },
    ],
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
  },
  {
    id: 3, name: "Priya Nair", handle: "@priyawellness", specialty: "Yoga & Mobility", niche: "yoga",
    tagline: "Move without pain. Finally.",
    bio: "500-hour RYT and certified mobility coach with a background in Iyengar yoga. I spent 10 years studying under traditional teachers in India and the US before developing my own approach — one that blends the precision of Iyengar alignment with modern mobility science. I work heavily with people dealing with chronic pain, desk-worker tightness, and those returning to movement after injury.",
    experience: "12 years teaching", responseTime: "Within 24 hours",
    platforms: { instagram: "178K", youtube: "220K" },
    price: "$$", priceRange: "$90–$160/mo",
    pricing: [
      { tier: "Flow", price: "$90/mo", includes: ["Weekly practice plan", "Access to recorded class library (200+ classes)", "Monthly Q&A call"] },
      { tier: "Restore", price: "$130/mo", includes: ["Personalized mobility assessment", "Custom weekly plan", "Bi-weekly 1-on-1 sessions", "Pain point focus protocol"] },
      { tier: "Immersion", price: "$160/mo", includes: ["Daily practice guidance", "Weekly private sessions", "Nutrition & lifestyle support", "Breathwork protocols"] },
    ],
    certifications: ["500-hr RYT (Yoga Alliance)", "FRC Mobility Specialist", "NASM Corrective Exercise"],
    rating: 4.95, reviews: 201, location: "Austin, TX",
    tags: ["Yoga", "Mobility", "Chronic Pain", "Beginner Friendly"],
    coachingMode: "both", style: "holistic",
    coachingIncludes: ["Custom mobility programming", "Recorded class library access", "Alignment coaching", "Breathwork guidance", "Lifestyle and stress support"],
    successStories: [
      { name: "Alan R.", result: "Resolved 3-year lower back pain in 8 weeks", quote: "I'd seen 4 physical therapists. Priya found the root cause in our first session." },
      { name: "Wendy T.", result: "Went from no flexibility to full splits in 6 months", quote: "She makes hard things feel safe. My body trusts movement again." },
      { name: "Marco B.", result: "Returned to running after hip surgery", quote: "Her attention to alignment detail is unlike anything I've experienced." },
    ],
    reviewsList: [
      { author: "Kelly S.", rating: 5, text: "Priya is a healer. I came to her broken and she gave me my body back. Cannot recommend enough." },
      { author: "James O.", rating: 5, text: "The recorded library alone is worth it. Hundreds of practices for every mood and need." },
      { author: "Nina C.", rating: 5, text: "She balances the ancient and the scientific so well. I understand why things work, not just what to do." },
    ],
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
  },
  {
    id: 4, name: "Marcus Webb", handle: "@marcusbuildz", specialty: "Bodybuilding & Hypertrophy", niche: "strength",
    tagline: "IFBB pro. Now building the next generation.",
    bio: "15 years on the competitive bodybuilding stage, including 6 IFBB Pro shows. I've dieted to 3% body fat and I've built myself back up to 230 lbs of stage-ready muscle. I understand this sport at a level most coaches never will — not from books, but from living it. Now I take serious clients who want to compete or who simply want to look like they could.",
    experience: "15 years competing, 7 coaching", responseTime: "Within 6 hours",
    platforms: { instagram: "390K", youtube: "155K", tiktok: "480K" },
    price: "$$$", priceRange: "$175–$300/mo",
    pricing: [
      { tier: "Hypertrophy", price: "$175/mo", includes: ["Periodized hypertrophy program", "Bi-weekly check-ins", "Supplement guidance", "Macro targets"] },
      { tier: "Competition Prep", price: "$250/mo", includes: ["Full contest prep protocol", "Weekly physique check-ins with photos", "Peak week planning", "Posing guidance"] },
      { tier: "VIP", price: "$300/mo", includes: ["Daily contact", "Custom meal plans", "Travel & show coordination", "Unlimited form reviews"] },
    ],
    certifications: ["IFBB Professional Bodybuilder", "NASM-CPT", "Precision Nutrition L2"],
    rating: 4.8, reviews: 147, location: "Las Vegas, NV",
    tags: ["Bodybuilding", "Competition Prep", "Hypertrophy"],
    coachingMode: "online", style: "tough love",
    coachingIncludes: ["Periodized training programs", "Detailed macro coaching", "Supplement protocols", "Weekly physique reviews", "Contest prep (if applicable)"],
    successStories: [
      { name: "Derek P.", result: "Won first NPC show in Men's Physique", quote: "Marcus knows exactly how to peak someone. I've never looked better in my life." },
      { name: "Tanya W.", result: "Added 12 lbs of lean muscle in one year", quote: "His programming is next level. Every set has a purpose." },
      { name: "Ryan C.", result: "Went from skinny-fat to stage-ready in 18 months", quote: "He's direct, sometimes brutal, always right. Worth every penny." },
    ],
    reviewsList: [
      { author: "Sean M.", rating: 5, text: "The most knowledgeable coach I've ever worked with. His contest prep protocol is a science." },
      { author: "Lisa T.", rating: 5, text: "I was skeptical of online coaching but Marcus changed my mind completely." },
      { author: "Damon R.", rating: 4, text: "Great results, high standards. Not for people who want hand-holding — but that's what I wanted." },
    ],
    img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
  },
  {
    id: 5, name: "Lena Kowalski", handle: "@lenarunswild", specialty: "Running & Endurance", niche: "cardio",
    tagline: "From couch to finish line. Scientifically.",
    bio: "Olympic Trials qualifier (2016, 2020) and exercise science graduate. I've run over 60,000 miles in my career and coached runners from their first 5K to sub-3 marathons and 100-mile ultras. I'm a heart rate nerd who believes in data-driven training — easy days easy, hard days hard — and I'll show you exactly why most runners plateau.",
    experience: "10 years coaching", responseTime: "Within 12 hours",
    platforms: { instagram: "93K", youtube: "44K" },
    price: "$$", priceRange: "$110–$175/mo",
    pricing: [
      { tier: "Base", price: "$110/mo", includes: ["Weekly training plan via TrainingPeaks", "Monthly video call", "Race-specific pacing strategy", "HR zone guidance"] },
      { tier: "Performance", price: "$150/mo", includes: ["Daily plan adjustments", "Bi-weekly calls", "Strength training integration", "Full race season planning"] },
      { tier: "Elite", price: "$175/mo", includes: ["Daily coaching contact", "Gait analysis review", "Altitude/heat training protocols", "Sponsor support"] },
    ],
    certifications: ["USATF Level 2 Coach", "ACSM Exercise Physiologist", "TrainingPeaks Certified Coach"],
    rating: 4.85, reviews: 88, location: "Boulder, CO",
    tags: ["Running", "Endurance", "Marathon", "Trail"],
    coachingMode: "both", style: "data-driven",
    coachingIncludes: ["TrainingPeaks integration", "Heart rate zone training", "Race-specific programming", "Strength & mobility plans", "Nutrition for endurance"],
    successStories: [
      { name: "Paul H.", result: "Qualified for Boston Marathon (BQ by 9 minutes)", quote: "Lena's polarized training approach felt counterintuitive but delivered in a huge way." },
      { name: "Sarah M.", result: "Finished first 50-mile ultra", quote: "She prepared me for every mile, including the miles where you want to quit." },
      { name: "Kevin T.", result: "Dropped marathon PR from 4:12 to 3:38", quote: "The data doesn't lie. Her method works." },
    ],
    reviewsList: [
      { author: "Amy R.", rating: 5, text: "The most evidence-based running coaching I've encountered. Everything is explained and purposeful." },
      { author: "Brian S.", rating: 5, text: "Lena built me up patiently. After two injury-plagued years I finally ran a full season healthy." },
      { author: "Carol J.", rating: 4, text: "The plans can be intense but she adjusts when life gets in the way." },
    ],
    img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80",
  },
  {
    id: 6, name: "Darius Kim", handle: "@dariusmoves", specialty: "Calisthenics & Movement", niche: "calisthenics",
    tagline: "Your body is all the equipment you need.",
    bio: "I went from a completely sedentary desk job to a handstand in 12 months with nothing but a pull-up bar and floor space. That journey turned into a mission — teaching people to master their own bodyweight. I've since built a community of 1M+ across platforms and coached thousands of students to their first muscle-up, handstand, and human flag. No gym required, ever.",
    experience: "5 years coaching", responseTime: "Same day",
    platforms: { instagram: "260K", tiktok: "880K", youtube: "130K" },
    price: "$", priceRange: "$40–$75/mo",
    pricing: [
      { tier: "Foundation", price: "$40/mo", includes: ["Beginner bodyweight program", "Video tutorial library", "Community forum access"] },
      { tier: "Movement", price: "$65/mo", includes: ["Progressive skill program", "Monthly 1-on-1 session", "Form feedback via video", "Community + direct chat"] },
      { tier: "Mastery", price: "$75/mo", includes: ["Custom skill roadmap", "Bi-weekly sessions", "Handstand/planche/lever tracks", "Priority coaching access"] },
    ],
    certifications: ["NASM-CPT", "FRC Mobility Specialist", "Animal Flow Certified"],
    rating: 4.75, reviews: 530, location: "New York, NY",
    tags: ["Calisthenics", "No Equipment", "Handstands", "Flexibility"],
    coachingMode: "online", style: "supportive",
    coachingIncludes: ["Progressive skill programming", "Video tutorial library", "1-on-1 video sessions", "Form analysis", "Community access"],
    successStories: [
      { name: "Tom B.", result: "Achieved first freestanding handstand at age 41", quote: "I thought handstands were for gymnasts. Darius proved me wrong in 4 months." },
      { name: "Nina S.", result: "First muscle-up after 6 weeks of programming", quote: "The progressions are genius. You never feel stuck — there's always a next step." },
      { name: "James L.", result: "Lost 30 lbs and learned 5 calisthenics skills", quote: "Best decision I made during lockdown. Still training with him 3 years later." },
    ],
    reviewsList: [
      { author: "Felix O.", rating: 5, text: "Darius breaks down complex movements into digestible progressions. The skill tracks are exceptional." },
      { author: "Maria V.", rating: 5, text: "Supportive, fun, and incredibly knowledgeable. The community he's built is also amazing." },
      { author: "Andrew P.", rating: 4, text: "Great value. The self-guided content is extensive." },
    ],
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
  },
  {
    id: 7, name: "Sofia Alvarez", handle: "@sofianutrition", specialty: "Nutrition & Weight Loss", niche: "nutrition",
    tagline: "No crash diets. No supplements. Just food that works.",
    bio: "Registered Dietitian and Certified Personal Trainer with a master's in nutritional sciences. I've worked in clinical settings, sports nutrition, and private coaching for over a decade. My approach is anti-diet — I don't believe in restriction for restriction's sake. I help clients find sustainable eating patterns that fit their actual life, not a fantasy version of it.",
    experience: "11 years", responseTime: "Within 8 hours",
    platforms: { instagram: "144K", tiktok: "320K" },
    price: "$$", priceRange: "$120–$200/mo",
    pricing: [
      { tier: "Foundations", price: "$120/mo", includes: ["Initial diet assessment", "Custom macro targets", "Meal planning templates", "Monthly check-in call"] },
      { tier: "Transformation", price: "$165/mo", includes: ["Full nutrition plan", "Bi-weekly calls", "Grocery lists & meal prep guides", "Body composition tracking"] },
      { tier: "Full Support", price: "$200/mo", includes: ["Daily accountability", "Lab result interpretation", "Supplement protocol (if needed)", "Lifestyle & stress coaching"] },
    ],
    certifications: ["Registered Dietitian (RD)", "CPT (NASM)", "MS Nutritional Sciences"],
    rating: 4.9, reviews: 276, location: "Chicago, IL",
    tags: ["Nutrition", "Weight Loss", "Sustainable", "Meal Planning"],
    coachingMode: "both", style: "holistic",
    coachingIncludes: ["Custom meal plans", "Macro & calorie coaching", "Grocery & meal prep guides", "Lab result review", "Mindful eating support"],
    successStories: [
      { name: "Rachel K.", result: "Lost 55 lbs without ever feeling deprived", quote: "Sofia taught me that eating well doesn't mean eating less. That mindset shift changed everything." },
      { name: "Carlos M.", result: "Reversed pre-diabetes through diet alone", quote: "Her clinical background made her uniquely qualified to help with my situation." },
      { name: "Emily S.", result: "Healed her relationship with food after 10 years of disordered eating", quote: "She's not just a nutrition coach — she's a life coach." },
    ],
    reviewsList: [
      { author: "Tanya H.", rating: 5, text: "Finally a nutritionist who doesn't make you feel like a failure for eating a slice of pizza." },
      { author: "Bobby R.", rating: 5, text: "The meal plans are realistic, delicious, and actually help you lose weight. Revolutionary concept apparently." },
      { author: "Natalie F.", rating: 5, text: "Worth every penny. The investment in my health paid for itself in lower medical bills." },
    ],
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
  },
  {
    id: 8, name: "Tyler Brooks", handle: "@tylerathlete", specialty: "Athletic Performance", niche: "performance",
    tagline: "Elite sports science. For everyone.",
    bio: "Strength and conditioning coach with a decade of experience working with professional athletes across the NFL, NBA, and MLS. I've designed training programs for combine prep, in-season maintenance, and post-injury return-to-sport. Now I bring those same methodologies to everyday athletes and serious fitness enthusiasts who want to train smarter and perform better.",
    experience: "10 years", responseTime: "Within 6 hours",
    platforms: { instagram: "205K", youtube: "98K" },
    price: "$$$", priceRange: "$180–$280/mo",
    pricing: [
      { tier: "Athlete", price: "$180/mo", includes: ["Sport-specific training plan", "Speed & agility programming", "Bi-weekly check-ins", "Performance testing protocols"] },
      { tier: "Performance+", price: "$230/mo", includes: ["Fully periodized annual plan", "Weekly calls", "Recovery & sleep optimization", "Nutrition timing guidance"] },
      { tier: "Pro", price: "$280/mo", includes: ["Daily coaching access", "Video movement analysis", "Combine/event prep", "Sport psychology resources"] },
    ],
    certifications: ["NSCA-CSCS", "NASM Performance Enhancement Specialist", "USA Weightlifting Sport Performance Coach"],
    rating: 4.85, reviews: 164, location: "Seattle, WA",
    tags: ["Athletic Performance", "Speed", "Agility", "Sports Science"],
    coachingMode: "both", style: "data-driven",
    coachingIncludes: ["Periodized performance programming", "Speed & power development", "Injury prevention protocols", "Recovery optimization", "Performance testing"],
    successStories: [
      { name: "Marcus J.", result: "Improved 40-yard dash from 4.7 to 4.51", quote: "Tyler's understanding of the nervous system and power development is on another level." },
      { name: "Kayla T.", result: "Made varsity soccer team after working with Tyler for 3 months", quote: "He turned me into a completely different athlete." },
      { name: "Derek O.", result: "Returned from ACL surgery 6 weeks ahead of schedule", quote: "His return-to-sport protocol was methodical and gave me full confidence." },
    ],
    reviewsList: [
      { author: "Jason M.", rating: 5, text: "Tyler's approach is miles ahead of any S&C coach I've worked with. The attention to detail is incredible." },
      { author: "Brianna S.", rating: 5, text: "I saw measurable improvements in every tested metric within 8 weeks." },
      { author: "Chris A.", rating: 4, text: "Premium price but premium results. The programming is genuinely elite." },
    ],
    img: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=400&q=80",
  },
  {
    id: 9, name: "Zoe Pham", handle: "@zoepilates", specialty: "Pilates & Core", niche: "yoga",
    tagline: "Core strength that changes everything else.",
    bio: "Comprehensively certified STOTT Pilates instructor with specializations in postpartum recovery and chronic back pain. I trained under master instructors in New York and Toronto before launching my online practice. My clients include postpartum moms, desk workers with back problems, dancers recovering from injury, and anyone who wants to understand how their core actually works.",
    experience: "9 years", responseTime: "Within 12 hours",
    platforms: { instagram: "87K", youtube: "62K" },
    price: "$$", priceRange: "$95–$155/mo",
    pricing: [
      { tier: "Mat", price: "$95/mo", includes: ["Weekly mat Pilates program", "Video library (150+ classes)", "Monthly check-in"] },
      { tier: "Reformer", price: "$130/mo", includes: ["Reformer + mat programming", "Bi-weekly 1-on-1 sessions", "Postpartum/back pain track access"] },
      { tier: "Intensive", price: "$155/mo", includes: ["Daily movement programming", "3x weekly sessions", "Full postpartum recovery protocol", "Nutritional guidance"] },
    ],
    certifications: ["STOTT Pilates Comprehensive", "Pre/Postnatal Pilates Certified", "Franklin Method Educator"],
    rating: 4.95, reviews: 98, location: "San Francisco, CA",
    tags: ["Pilates", "Core", "Postpartum", "Back Pain"],
    coachingMode: "both", style: "supportive",
    coachingIncludes: ["Mat & reformer programming", "Core rehabilitation", "Postpartum recovery protocols", "Back pain management", "Breathwork & alignment"],
    successStories: [
      { name: "Amanda H.", result: "Fully recovered from diastasis recti in 12 weeks", quote: "Zoe knew exactly what my postpartum body needed. I'm stronger now than before pregnancy." },
      { name: "Michael T.", result: "Resolved chronic lower back pain of 7 years", quote: "She found the weakness nobody else found. Three months later I'm pain-free." },
      { name: "Sophie L.", result: "Returned to dance after hip injury", quote: "Her understanding of functional movement is exceptional." },
    ],
    reviewsList: [
      { author: "Dana R.", rating: 5, text: "Zoe is a true specialist. Her knowledge of postpartum recovery is unmatched." },
      { author: "Robert K.", rating: 5, text: "I was skeptical about Pilates for a 45-year-old man with back issues. I was completely wrong." },
      { author: "Michelle P.", rating: 5, text: "The most effective core work I've ever done. Results were visible within 3 weeks." },
    ],
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
  },
  {
    id: 10, name: "Rex Tanner", handle: "@rextannercf", specialty: "CrossFit & Functional Fitness", niche: "hiit",
    tagline: "Earn your fitness. Every rep.",
    bio: "CrossFit Level 3 trainer and affiliate gym owner with 12 years in the sport. I've competed at the regional level and coached athletes from first WOD to Sanctionals. I believe functional fitness is the most complete form of training on the planet — and I've built a remote coaching practice that delivers the same intensity and community as a box, wherever you are.",
    experience: "12 years", responseTime: "Within 8 hours",
    platforms: { instagram: "176K", youtube: "55K", tiktok: "290K" },
    price: "$$", priceRange: "$100–$160/mo",
    pricing: [
      { tier: "WOD", price: "$100/mo", includes: ["Daily programming", "Scaled options for every workout", "Community Slack access", "Monthly call"] },
      { tier: "Competition", price: "$140/mo", includes: ["Competitive programming track", "Skill development sessions", "Weekly check-ins", "Open prep support"] },
      { tier: "1-on-1", price: "$160/mo", includes: ["Fully custom programming", "Daily messaging", "Video coaching sessions", "Nutrition guidance"] },
    ],
    certifications: ["CrossFit L3 Trainer", "USAW Sport Performance Coach", "CrossFit Gymnastics Cert"],
    rating: 4.75, reviews: 203, location: "Denver, CO",
    tags: ["CrossFit", "Functional Fitness", "WODs", "Community"],
    coachingMode: "both", style: "tough love",
    coachingIncludes: ["Daily WOD programming", "Skill development", "Mobility work", "Community access", "Competition prep"],
    successStories: [
      { name: "Natasha P.", result: "Competed in first CrossFit Open after 6 months", quote: "Rex made me feel like I belonged in competitive fitness. That confidence carries over everywhere." },
      { name: "Ben M.", result: "Achieved first Rx WOD after 3 months", quote: "The progressions and scaling options are perfect. Never felt left behind." },
      { name: "Karla S.", result: "Lost 28 lbs while gaining strength", quote: "CrossFit with good coaching is transformative. Rex is great coaching." },
    ],
    reviewsList: [
      { author: "Tom P.", rating: 5, text: "Rex builds community even in an online setting. The Slack group is active, supportive, and motivating." },
      { author: "Jenny L.", rating: 4, text: "Intense but fair. He pushes you hard but respects your current level." },
      { author: "Mike D.", rating: 5, text: "Best programming I've followed. Constantly varied, always purposeful." },
    ],
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
  },
  {
    id: 11, name: "Amara Osei", handle: "@amaraboxfit", specialty: "Boxing & Combat Fitness", niche: "hiit",
    tagline: "Hit harder. Feel stronger. Own the room.",
    bio: "Former professional boxer with an 18-5 record and 3 regional titles. After retiring, I found my calling in coaching — specifically helping everyday people use boxing as a vehicle for physical and mental transformation. My clients aren't trying to fight — they're trying to build confidence, burn fat, and learn skills that make them feel powerful in their bodies.",
    experience: "7 years coaching", responseTime: "Same day",
    platforms: { instagram: "321K", tiktok: "740K" },
    price: "$", priceRange: "$55–$95/mo",
    pricing: [
      { tier: "Fundamentals", price: "$55/mo", includes: ["Boxing basics program", "Shadowboxing routines", "Conditioning workouts", "Video feedback (1x/mo)"] },
      { tier: "Fighter", price: "$80/mo", includes: ["Advanced boxing program", "Sparring prep", "Bi-weekly check-ins", "Conditioning + strength integration"] },
      { tier: "Champion", price: "$95/mo", includes: ["Full fight prep or advanced fitness program", "Weekly coaching calls", "Nutrition coaching", "Mental performance tools"] },
    ],
    certifications: ["USA Boxing Certified Coach", "ACE-CPT", "Mental Performance Specialist"],
    rating: 4.8, reviews: 415, location: "Philadelphia, PA",
    tags: ["Boxing", "Combat Fitness", "Confidence", "Fat Loss"],
    coachingMode: "both", style: "tough love",
    coachingIncludes: ["Technical boxing instruction", "Conditioning programs", "Strength integration", "Mental toughness tools", "Shadowboxing & bag work"],
    successStories: [
      { name: "Victor R.", result: "Lost 45 lbs and won first amateur boxing match", quote: "Amara transformed my body and my mentality. I walk differently now." },
      { name: "Lucy T.", result: "Overcame anxiety through boxing training", quote: "I came for the workout and left with a completely different relationship with confidence." },
      { name: "Andre B.", result: "Dropped from 240 to 195 in 7 months", quote: "The workouts are brutal in the best way. You never want to miss a session." },
    ],
    reviewsList: [
      { author: "Jasmine K.", rating: 5, text: "Amara is electrifying. Her energy is contagious and her technical coaching is elite." },
      { author: "Daniel S.", rating: 5, text: "Never thought I'd love working out. Boxing with Amara changed that permanently." },
      { author: "Patricia M.", rating: 4, text: "Intense and effective. She demands a lot but celebrates every win." },
    ],
    img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&q=80",
  },
  {
    id: 12, name: "Claire Fontaine", handle: "@claireprenatal", specialty: "Pre & Postnatal Fitness", niche: "yoga",
    tagline: "Strong through every trimester — and beyond.",
    bio: "Certified pre/postnatal fitness specialist and former labor and delivery nurse with 10 years of clinical experience. I combine medical knowledge with practical fitness coaching to help pregnant and postpartum women stay strong, safe, and confident in their bodies. I work with women from first trimester through 12+ months postpartum.",
    experience: "10 years", responseTime: "Within 12 hours",
    platforms: { instagram: "112K", youtube: "88K" },
    price: "$$", priceRange: "$100–$150/mo",
    pricing: [
      { tier: "Trimester", price: "$100/mo", includes: ["Trimester-specific program", "Safe exercise modifications", "Weekly check-ins", "Birth prep movement"] },
      { tier: "Postpartum", price: "$120/mo", includes: ["Postpartum recovery protocol", "Pelvic floor focus", "Core rehab program", "Bi-weekly calls"] },
      { tier: "Full Journey", price: "$150/mo", includes: ["Prenatal + postpartum continuum", "Weekly sessions", "Nutritional support", "Community of expecting moms"] },
    ],
    certifications: ["Pre/Postnatal Fitness Specialist (NASM)", "RN (Labor & Delivery)", "Pelvic Floor Rehab Trained"],
    rating: 4.98, reviews: 142, location: "Portland, OR",
    tags: ["Prenatal", "Postpartum", "Core Restore", "Safe Pregnancy"],
    coachingMode: "online", style: "supportive",
    coachingIncludes: ["Trimester-specific programming", "Pelvic floor guidance", "Core rehabilitation", "Birth preparation", "Postpartum recovery"],
    successStories: [
      { name: "Megan S.", result: "Active through entire pregnancy, 12-hr labor, recovered in 6 weeks", quote: "Claire's training literally changed my birth experience. My OB was amazed at my recovery." },
      { name: "Tara B.", result: "Healed diastasis recti and returned to running at 4 months postpartum", quote: "Her clinical background made me feel completely safe pushing through pregnancy." },
      { name: "Kate W.", result: "No back pain during third trimester (had severe pain in first pregnancy)", quote: "I wish I'd found her with my first. Night and day difference." },
    ],
    reviewsList: [
      { author: "Hannah R.", rating: 5, text: "Claire is the only fitness professional I'd trust with prenatal coaching. Her medical background is invaluable." },
      { author: "Olivia M.", rating: 5, text: "She made me feel powerful and safe throughout my entire pregnancy. The postpartum programming is equally excellent." },
      { author: "Jessica T.", rating: 5, text: "My doctor recommended her. My body thanked me. Five stars isn't enough." },
    ],
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
  },
];

const QUIZ_STEPS = [
  { id: "goal", question: "What's your primary fitness goal?", emoji: "🎯", options: ["Lose weight & burn fat", "Build muscle & get stronger", "Improve endurance & cardio", "Flexibility, mobility & recovery", "Athletic performance & sport", "Nutrition & healthy eating habits", "General wellness & stress relief"] },
  { id: "experience", question: "What's your experience level?", emoji: "📊", options: ["Complete beginner (just starting out)", "Some experience (occasional gym-goer)", "Intermediate (consistent 1-2 years)", "Advanced (3+ years, serious training)"] },
  { id: "days", question: "How many days per week can you commit?", emoji: "📅", options: ["1-2 days", "3-4 days", "5-6 days", "Every day"] },
  { id: "budget", question: "What's your monthly coaching budget?", emoji: "💰", options: ["Budget-friendly ($50 or less)", "Mid-range ($50-150/month)", "Premium ($150+/month)", "Price isn't a factor"] },
  { id: "mode", question: "How do you want to train?", emoji: "📍", options: ["Fully online", "In-person only", "Either works"] },
  { id: "style", question: "What coaching style gets the best out of you?", emoji: "🧠", options: ["Tough love — push me hard", "Supportive & encouraging", "Science-based & data-driven", "Holistic — mind, body, lifestyle"] },
  { id: "special", question: "Any specific needs or focus areas?", emoji: "⚡", multi: true, options: ["No equipment / home workouts", "Competition or event prep", "Postpartum or injury recovery", "Sport-specific training", "Chronic pain or health conditions", "No special requirements"] },
];

const PLATFORM_ICONS = { instagram: { label: "IG", color: "#E1306C" }, youtube: { label: "YT", color: "#FF0000" }, tiktok: { label: "TT", color: "#69C9D0" } };
const NICHES = ["All", "strength", "hiit", "yoga", "cardio", "calisthenics", "nutrition", "performance"];
const PRICES = ["All", "$", "$$", "$$$"];
const PLATFORMS_FILTER = ["All", "instagram", "youtube", "tiktok"];

function StarRating({ rating, size = 12 }) {
  return (
    <span style={{ color: C.accent, fontSize: size }}>
      {"★".repeat(Math.floor(rating))}<span style={{ color: C.borderLight }}>{"★".repeat(5 - Math.floor(rating))}</span>
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
        <img src={trainer.img} alt={trainer.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => { e.target.style.display = "none"; }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.card} 0%, transparent 55%)` }} />
        <div style={{ position: "absolute", top: "12px", right: "12px", background: C.accent, color: "#000", fontWeight: 800, fontSize: "12px", padding: "3px 10px", borderRadius: "20px" }}>{trainer.price}</div>
        {matchReason && <div style={{ position: "absolute", top: "12px", left: "12px", background: C.accentDim, border: `1px solid ${C.accentBorder}`, color: C.accent, fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "20px" }}>✦ MATCHED</div>}
      </div>
      <div style={{ padding: "16px" }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "22px", color: C.textPrimary, letterSpacing: "1px", lineHeight: 1 }}>{trainer.name}</div>
        <div style={{ fontSize: "12px", color: C.textMuted, marginBottom: "6px" }}>{trainer.handle} · {trainer.location}</div>
        <div style={{ fontSize: "12px", fontWeight: 600, color: C.accent, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{trainer.specialty}</div>
        {matchReason
          ? <div style={{ fontSize: "12px", color: C.textSecondary, lineHeight: 1.55, marginBottom: "10px", padding: "8px 10px", background: C.accentDim, borderRadius: "8px", border: `1px solid ${C.accentBorder}` }}>{matchReason}</div>
          : <p style={{ fontSize: "13px", color: C.textMuted, lineHeight: 1.55, marginBottom: "12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{trainer.tagline}</p>
        }
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "10px" }}>
          {Object.entries(trainer.platforms).map(([p, count]) => <PlatformBadge key={p} platform={p} count={count} />)}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <StarRating rating={trainer.rating} />
            <span style={{ fontSize: "12px", color: C.textMuted }}>{trainer.rating} ({trainer.reviews})</span>
          </div>
          <span style={{ fontSize: "12px", color: C.textMuted }}>{trainer.priceRange}</span>
        </div>
      </div>
    </div>
  );
}

function ProfilePage({ trainer, onBack }) {
  const [activeTab, setActiveTab] = useState("about");
  const tabs = ["about", "pricing", "reviews", "success"];

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      {/* Hero */}
      <div style={{ position: "relative", height: "320px", overflow: "hidden", background: C.surface }}>
        <img src={trainer.img} alt={trainer.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #212121 0%, rgba(33,33,33,0.4) 60%, transparent 100%)" }} />
        <button onClick={onBack} style={{ position: "absolute", top: "20px", left: "24px", background: "rgba(0,0,0,0.5)", border: `1px solid ${C.border}`, color: C.textPrimary, borderRadius: "10px", padding: "8px 16px", cursor: "pointer", fontSize: "13px", fontWeight: 600, backdropFilter: "blur(8px)" }}>← Back</button>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 60px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(36px, 5vw, 52px)", color: C.textPrimary, letterSpacing: "1px", lineHeight: 1 }}>{trainer.name}</div>
            <div style={{ fontSize: "14px", color: C.textMuted, marginBottom: "6px" }}>{trainer.handle} · {trainer.location}</div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>{trainer.specialty}</div>
            <div style={{ fontStyle: "italic", fontSize: "15px", color: C.textSecondary }}>"{trainer.tagline}"</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ background: C.accent, color: "#000", fontWeight: 800, fontSize: "18px", padding: "8px 20px", borderRadius: "12px", marginBottom: "8px" }}>{trainer.priceRange}</div>
            <div style={{ fontSize: "12px", color: C.textMuted }}>per month</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px", justifyContent: "flex-end" }}>
              <StarRating rating={trainer.rating} size={14} />
              <span style={{ fontSize: "13px", color: C.textSecondary, fontWeight: 600 }}>{trainer.rating} ({trainer.reviews} reviews)</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "28px" }}>
          {[
            { label: "Experience", value: trainer.experience },
            { label: "Response Time", value: trainer.responseTime },
            { label: "Coaching Mode", value: trainer.coachingMode === "both" ? "Online & In-Person" : trainer.coachingMode === "online" ? "Online Only" : "In-Person" },
            { label: "Style", value: trainer.style },
          ].map(s => (
            <div key={s.label} style={{ background: C.card, borderRadius: "12px", padding: "14px", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: "10px", color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>{s.label}</div>
              <div style={{ fontSize: "14px", color: C.textPrimary, fontWeight: 600, textTransform: "capitalize" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Platforms */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "28px", flexWrap: "wrap" }}>
          {Object.entries(trainer.platforms).map(([p, count]) => {
            const icon = PLATFORM_ICONS[p];
            return (
              <div key={p} style={{ background: C.card, borderRadius: "12px", padding: "10px 16px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: icon.color, fontWeight: 800, fontSize: "12px" }}>{icon.label}</span>
                <span style={{ color: C.textPrimary, fontWeight: 700, fontFamily: "'Bebas Neue', cursive", fontSize: "18px", letterSpacing: "1px" }}>{count}</span>
                <span style={{ color: C.textMuted, fontSize: "11px" }}>followers</span>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "28px", background: C.surface, borderRadius: "12px", padding: "4px" }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, background: activeTab === t ? C.accent : "transparent", color: activeTab === t ? "#000" : C.textMuted, transition: "all 0.15s", textTransform: "capitalize" }}>{t === "success" ? "Success Stories" : t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "about" && (
          <div style={{ display: "grid", gap: "20px" }}>
            <div style={{ background: C.card, borderRadius: "16px", padding: "24px", border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "20px", color: C.textPrimary, letterSpacing: "1px", marginBottom: "12px" }}>About</div>
              <p style={{ fontSize: "15px", color: C.textSecondary, lineHeight: 1.75 }}>{trainer.bio}</p>
            </div>
            <div style={{ background: C.card, borderRadius: "16px", padding: "24px", border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "20px", color: C.textPrimary, letterSpacing: "1px", marginBottom: "16px" }}>Certifications</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {trainer.certifications.map(c => <span key={c} style={{ background: C.accentDim, color: C.accent, border: `1px solid ${C.accentBorder}`, borderRadius: "20px", padding: "6px 14px", fontSize: "13px", fontWeight: 500 }}>{c}</span>)}
              </div>
            </div>
            <div style={{ background: C.card, borderRadius: "16px", padding: "24px", border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "20px", color: C.textPrimary, letterSpacing: "1px", marginBottom: "16px" }}>What's Included</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
                {trainer.coachingIncludes.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: C.textSecondary }}>
                    <span style={{ color: C.accent, fontSize: "16px", flexShrink: 0 }}>✓</span>{item}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {trainer.tags.map(t => <span key={t} style={{ background: C.surface, color: C.textSecondary, border: `1px solid ${C.border}`, borderRadius: "20px", padding: "6px 14px", fontSize: "13px" }}>{t}</span>)}
            </div>
          </div>
        )}

        {activeTab === "pricing" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
            {trainer.pricing.map((tier, i) => (
              <div key={tier.tier} style={{ background: C.card, borderRadius: "16px", padding: "24px", border: `1px solid ${i === 1 ? C.accentBorder : C.border}`, position: "relative", overflow: "hidden" }}>
                {i === 1 && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: C.accent }} />}
                {i === 1 && <div style={{ fontSize: "10px", color: C.accent, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Most Popular</div>}
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "24px", color: C.textPrimary, letterSpacing: "1px" }}>{tier.tier}</div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: C.accent, margin: "8px 0 16px", fontFamily: "'DM Sans', sans-serif" }}>{tier.price}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {tier.includes.map(item => (
                    <div key={item} style={{ display: "flex", gap: "8px", fontSize: "13px", color: C.textSecondary, alignItems: "flex-start" }}>
                      <span style={{ color: C.accent, flexShrink: 0, marginTop: "1px" }}>✓</span>{item}
                    </div>
                  ))}
                </div>
                <button style={{ width: "100%", marginTop: "20px", background: i === 1 ? C.accent : "transparent", color: i === 1 ? "#000" : C.textSecondary, border: `1px solid ${i === 1 ? C.accent : C.border}`, borderRadius: "10px", padding: "12px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>Get Started</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div style={{ display: "grid", gap: "16px" }}>
            <div style={{ background: C.card, borderRadius: "16px", padding: "20px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "56px", color: C.accent, letterSpacing: "2px", lineHeight: 1 }}>{trainer.rating}</div>
                <StarRating rating={trainer.rating} size={16} />
                <div style={{ fontSize: "13px", color: C.textMuted, marginTop: "4px" }}>{trainer.reviews} reviews</div>
              </div>
              <div style={{ flex: 1, minWidth: "160px" }}>
                {[5,4,3].map(n => (
                  <div key={n} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "12px", color: C.textMuted, width: "12px" }}>{n}</span>
                    <span style={{ color: C.accent, fontSize: "12px" }}>★</span>
                    <div style={{ flex: 1, height: "6px", background: C.border, borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", background: C.accent, borderRadius: "3px", width: n === 5 ? "78%" : n === 4 ? "18%" : "4%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {trainer.reviewsList.map((r, i) => (
              <div key={i} style={{ background: C.card, borderRadius: "16px", padding: "20px", border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontWeight: 700, color: C.textPrimary, fontSize: "14px" }}>{r.author}</span>
                  <StarRating rating={r.rating} />
                </div>
                <p style={{ fontSize: "14px", color: C.textSecondary, lineHeight: 1.65, margin: 0 }}>{r.text}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "success" && (
          <div style={{ display: "grid", gap: "16px" }}>
            {trainer.successStories.map((s, i) => (
              <div key={i} style={{ background: C.card, borderRadius: "16px", padding: "24px", border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", flexWrap: "wrap" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: C.accentDim, border: `2px solid ${C.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', cursive", fontSize: "20px", color: C.accent, flexShrink: 0 }}>{s.name[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: C.textPrimary, fontSize: "15px", marginBottom: "4px" }}>{s.name}</div>
                    <div style={{ display: "inline-block", background: C.accentDim, color: C.accent, border: `1px solid ${C.accentBorder}`, borderRadius: "20px", padding: "3px 12px", fontSize: "12px", fontWeight: 600, marginBottom: "12px" }}>✦ {s.result}</div>
                    <p style={{ fontSize: "14px", color: C.textSecondary, lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>"{s.quote}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: "32px", background: C.accentDim, border: `1px solid ${C.accentBorder}`, borderRadius: "16px", padding: "28px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", color: C.textPrimary, letterSpacing: "1px", marginBottom: "8px" }}>Ready to Start?</div>
          <p style={{ fontSize: "14px", color: C.textSecondary, marginBottom: "20px" }}>Reach out to {trainer.name.split(" ")[0]} directly on {Object.keys(trainer.platforms)[0].charAt(0).toUpperCase() + Object.keys(trainer.platforms)[0].slice(1)} or through their website.</p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {Object.entries(trainer.platforms).map(([p]) => {
              const icon = PLATFORM_ICONS[p];
              return <button key={p} style={{ background: C.card, color: C.textPrimary, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "10px 20px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>Follow on <span style={{ color: icon.color }}>{icon.label}</span></button>;
            })}
          </div>
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

Return ONLY valid JSON, no markdown:
{"matches":[{"id":1,"reason":"2-sentence personalized match explanation"},{"id":2,"reason":"..."},{"id":3,"reason":"..."}]}`;

      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] })
      });
      const data = await res.json();
      const text = data.content.map(b => b.text || "").join("").replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(text);
      const matches = parsed.matches.map(m => ({ trainer: TRAINERS.find(t => t.id === m.id), reason: m.reason })).filter(m => m.trainer);
      onResults(matches); onClose();
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "20px" }}>
      <div style={{ background: C.surface, borderRadius: "24px", border: `1px solid ${C.border}`, maxWidth: "560px", width: "100%", overflow: "hidden" }}>
        <div style={{ height: "3px", background: C.card }}><div style={{ height: "100%", width: `${(step / QUIZ_STEPS.length) * 100}%`, background: C.accent, transition: "width 0.4s ease" }} /></div>
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

function MatchResults({ matches, onBrowseAll, onRetake, onViewProfile }) {
  return (
    <div>
      <div style={{ textAlign: "center", padding: "40px 32px 28px" }}>
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>✦</div>
        <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(36px, 6vw, 52px)", color: C.accent, letterSpacing: "2px", margin: "0 0 8px" }}>YOUR MATCHES</h2>
        <p style={{ color: C.textMuted, fontSize: "14px", maxWidth: "380px", margin: "0 auto 12px" }}>Based on your goals, these coaches are your best fit.</p>
        <button onClick={onRetake} style={{ background: "none", border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: "20px", padding: "6px 16px", fontSize: "12px", cursor: "pointer" }}>Retake Quiz</button>
      </div>
      <div style={{ padding: "0 32px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
        {matches.map(({ trainer, reason }) => <TrainerCard key={trainer.id} trainer={trainer} onClick={onViewProfile} matchReason={reason} />)}
      </div>
      <div style={{ textAlign: "center", padding: "12px 32px 48px" }}>
        <button onClick={onBrowseAll} style={{ background: C.card, color: C.textSecondary, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "12px 28px", fontSize: "14px", cursor: "pointer", fontWeight: 600 }}>Browse All Trainers →</button>
      </div>
    </div>
  );
}

export default function FitFind() {
  const [search, setSearch] = useState("");
  const [niche, setNiche] = useState("All");
  const [price, setPrice] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [showQuiz, setShowQuiz] = useState(false);
  const [view, setView] = useState("browse");
  const [matchResults, setMatchResults] = useState(null);
  const [profileTrainer, setProfileTrainer] = useState(null);

  const filtered = useMemo(() => TRAINERS.filter(t => {
    const s = search.toLowerCase();
    return (!s || t.name.toLowerCase().includes(s) || t.specialty.toLowerCase().includes(s) || t.tags.some(tag => tag.toLowerCase().includes(s)))
      && (niche === "All" || t.niche === niche) && (price === "All" || t.price === price) && (platform === "All" || t.platforms[platform]);
  }), [search, niche, price, platform]);

  const FilterBtn = ({ label, active, onClick }) => (
    <button onClick={onClick} style={{ background: active ? C.accent : "transparent", color: active ? "#000" : C.textMuted, border: `1px solid ${active ? C.accent : C.border}`, borderRadius: "20px", padding: "6px 14px", fontSize: "12px", cursor: "pointer", fontWeight: active ? 700 : 400, transition: "all 0.15s", textTransform: "capitalize", whiteSpace: "nowrap" }}>{label}</button>
  );

  if (profileTrainer) return <ProfilePage trainer={profileTrainer} onBack={() => setProfileTrainer(null)} />;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', sans-serif", color: C.textPrimary }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: `rgba(33,33,33,0.96)`, backdropFilter: "blur(12px)", zIndex: 100, flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
          <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", color: C.accent, letterSpacing: "2px", cursor: "pointer" }} onClick={() => { setView("browse"); setMatchResults(null); }}>FITFIND</span>
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
        <MatchResults matches={matchResults} onBrowseAll={() => setView("browse")} onRetake={() => { setMatchResults(null); setShowQuiz(true); }} onViewProfile={setProfileTrainer} />
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
            <div>
              <div style={{ fontSize: "10px", color: C.textMuted, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Specialty</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>{NICHES.map(n => <FilterBtn key={n} label={n} active={niche === n} onClick={() => setNiche(n)} />)}</div>
            </div>
            <div>
              <div style={{ fontSize: "10px", color: C.textMuted, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Price</div>
              <div style={{ display: "flex", gap: "6px" }}>{PRICES.map(p => <FilterBtn key={p} label={p} active={price === p} onClick={() => setPrice(p)} />)}</div>
            </div>
            <div>
              <div style={{ fontSize: "10px", color: C.textMuted, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Platform</div>
              <div style={{ display: "flex", gap: "6px" }}>{PLATFORMS_FILTER.map(p => <FilterBtn key={p} label={p === "All" ? "All" : PLATFORM_ICONS[p].label} active={platform === p} onClick={() => setPlatform(p)} />)}</div>
            </div>
          </div>

          <div style={{ padding: "16px 32px 4px", fontSize: "13px", color: C.textMuted }}>{filtered.length} trainer{filtered.length !== 1 ? "s" : ""} found</div>
          <div style={{ padding: "16px 32px 60px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {filtered.length === 0
              ? <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px", color: C.textMuted }}><div style={{ fontSize: "48px", marginBottom: "12px" }}>🏋️</div><div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "24px" }}>NO TRAINERS FOUND</div></div>
              : filtered.map(t => <TrainerCard key={t.id} trainer={t} onClick={setProfileTrainer} />)
            }
          </div>
        </>
      )}

      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} onResults={res => { setMatchResults(res); setView("results"); }} />}
    </div>
  );
}