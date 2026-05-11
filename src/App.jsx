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
    experience: "8 years", responseTime: "Under 4 hours",
    platforms: { instagram: "284K", youtube: "91K", tiktok: "610K" },
    price: "$$", priceRange: "$100–$175/mo",
    pricing: [
      { tier: "Starter", price: "$100/mo", includes: ["Custom 4-day program", "Weekly check-ins", "Form video review (2x/mo)", "Nutrition guidelines"] },
      { tier: "Premium", price: "$150/mo", includes: ["Custom 5-day program", "Daily messaging access", "Weekly video call", "Full macro coaching", "Priority response"] },
      { tier: "Elite", price: "$175/mo", includes: ["Everything in Premium", "Meet prep (if applicable)", "Monthly deload planning", "1-on-1 strategy sessions"] },
    ],
    certifications: ["NSCA-CSCS", "USA Powerlifting Coach", "Precision Nutrition L1"],
    rating: 4.9, reviews: 312, location: "Los Angeles, CA",
    tags: ["Women's Lifting", "Beginner Friendly", "Powerlifting"], coachingMode: "online", style: "tough love",
    coachingIncludes: ["Custom training programs", "Form video analysis", "Nutrition guidance", "Check-in calls", "Access to private client app"],
    successStories: [
      { name: "Jordan T.", result: "Hit her first 200lb deadlift in 6 months", quote: "Maya completely changed how I see the gym. I went from scared of barbells to competing in my first meet." },
      { name: "Priya M.", result: "Lost 22 lbs while gaining visible muscle", quote: "The programming is hard but smart. She always knows when to push and when to back off." },
      { name: "Cassie R.", result: "Recovered from gym anxiety, now trains 5x/week", quote: "Best investment I've ever made. She explained the why behind everything." },
    ],
    reviewsList: [
      { author: "Lauren B.", rating: 5, text: "Maya is the real deal. Her programming is thoughtful and she actually watches your form videos and gives detailed feedback." },
      { author: "Tina K.", rating: 5, text: "I've had 3 coaches before Maya. None came close to her expertise and communication." },
      { author: "Sam D.", rating: 4, text: "Great coach, sometimes takes a day to reply but always thorough when she does." },
    ],
    img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80",
  },
  {
    id: 2, name: "Jordan Reyes", handle: "@jordanfitpro", specialty: "HIIT & Fat Loss", niche: "hiit",
    tagline: "30 days to a body that earns it.",
    bio: "Former D1 soccer athlete turned fat loss coach. I know what it takes to perform at the highest level, and I know what happens when the structure disappears after college. I gained 35 lbs in two years before rebuilding from scratch. Now I help everyday people cut through the noise with short, efficient programs that actually work without spending 2 hours in the gym.",
    experience: "6 years", responseTime: "Same day",
    platforms: { instagram: "512K", tiktok: "1.2M" },
    price: "$", priceRange: "$45–$80/mo",
    pricing: [
      { tier: "Self-Guided", price: "$45/mo", includes: ["Monthly program download", "Exercise video library", "Private community access"] },
      { tier: "Coached", price: "$80/mo", includes: ["New program every 4 weeks", "Bi-weekly check-ins", "Nutrition tracking support", "Community + direct messaging"] },
    ],
    certifications: ["ACE-CPT", "NASM Nutrition Coach", "TRX Certified"],
    rating: 4.7, reviews: 890, location: "Miami, FL",
    tags: ["Fat Loss", "HIIT", "Quick Workouts"], coachingMode: "online", style: "accountability",
    coachingIncludes: ["Monthly HIIT programming", "Cardio protocols", "Nutrition tracking guidance", "Private community", "Accountability check-ins"],
    successStories: [
      { name: "Mike S.", result: "Down 40 lbs in 5 months", quote: "The workouts are 30-45 minutes but I've never sweat this much in my life. It works." },
      { name: "Danielle F.", result: "Went from a size 14 to a size 8", quote: "Jordan holds you accountable without making you feel bad. Perfect balance." },
      { name: "Chris W.", result: "Completed first 5K after years of no cardio", quote: "Started just wanting to lose weight and ended up falling in love with fitness." },
    ],
    reviewsList: [
      { author: "Rachel M.", rating: 5, text: "The programs are incredibly well structured and the community keeps you going on the hard days." },
      { author: "David L.", rating: 5, text: "Affordable, effective, and actually enjoyable. I didn't think those three things could coexist." },
      { author: "Aisha P.", rating: 4, text: "Good value for the price. Would love more personalization but the programs are solid." },
    ],
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
  },
  {
    id: 3, name: "Priya Nair", handle: "@priyawellness", specialty: "Yoga & Mobility", niche: "yoga",
    tagline: "Move without pain. Finally.",
    bio: "500-hour RYT and certified mobility coach with a background in Iyengar yoga. I spent 10 years studying under traditional teachers in India and the US before developing my own approach — one that blends the precision of Iyengar alignment with modern mobility science. I work with people dealing with chronic pain, desk-worker tightness, and those returning to movement after injury.",
    experience: "12 years", responseTime: "Within 24 hours",
    platforms: { instagram: "178K", youtube: "220K" },
    price: "$$", priceRange: "$90–$160/mo",
    pricing: [
      { tier: "Flow", price: "$90/mo", includes: ["Weekly practice plan", "Access to recorded class library (200+ classes)", "Monthly Q&A call"] },
      { tier: "Restore", price: "$130/mo", includes: ["Personalized mobility assessment", "Custom weekly plan", "Bi-weekly 1-on-1 sessions", "Pain point focus protocol"] },
      { tier: "Immersion", price: "$160/mo", includes: ["Daily practice guidance", "Weekly private sessions", "Nutrition & lifestyle support", "Breathwork protocols"] },
    ],
    certifications: ["500-hr RYT (Yoga Alliance)", "FRC Mobility Specialist", "NASM Corrective Exercise"],
    rating: 4.95, reviews: 201, location: "Austin, TX",
    tags: ["Yoga", "Mobility", "Chronic Pain", "Beginner Friendly"], coachingMode: "both", style: "holistic",
    coachingIncludes: ["Custom mobility programming", "Recorded class library access", "Alignment coaching", "Breathwork guidance", "Lifestyle and stress support"],
    successStories: [
      { name: "Alan R.", result: "Resolved 3-year lower back pain in 8 weeks", quote: "I'd seen 4 physical therapists. Priya found the root cause in our first session." },
      { name: "Wendy T.", result: "Went from no flexibility to full splits in 6 months", quote: "She makes hard things feel safe. My body trusts movement again." },
      { name: "Marco B.", result: "Returned to running after hip surgery", quote: "Her attention to alignment detail is unlike anything I've experienced." },
    ],
    reviewsList: [
      { author: "Kelly S.", rating: 5, text: "Priya is a healer. I came to her broken and she gave me my body back." },
      { author: "James O.", rating: 5, text: "The recorded library alone is worth it. Hundreds of practices for every mood and need." },
      { author: "Nina C.", rating: 5, text: "She balances the ancient and the scientific so well." },
    ],
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
  },
  {
    id: 4, name: "Marcus Webb", handle: "@marcusbuildz", specialty: "Bodybuilding & Hypertrophy", niche: "strength",
    tagline: "IFBB pro. Now building the next generation.",
    bio: "15 years on the competitive bodybuilding stage, including 6 IFBB Pro shows. I've dieted to 3% body fat and built myself back up to 230 lbs of stage-ready muscle. I understand this sport at a level most coaches never will — not from books, but from living it. I take serious clients who want to compete or simply want to look like they could.",
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
    tags: ["Bodybuilding", "Competition Prep", "Hypertrophy"], coachingMode: "online", style: "tough love",
    coachingIncludes: ["Periodized training programs", "Detailed macro coaching", "Supplement protocols", "Weekly physique reviews", "Contest prep"],
    successStories: [
      { name: "Derek P.", result: "Won first NPC show in Men's Physique", quote: "Marcus knows exactly how to peak someone. I've never looked better in my life." },
      { name: "Tanya W.", result: "Added 12 lbs of lean muscle in one year", quote: "His programming is next level. Every set has a purpose." },
      { name: "Ryan C.", result: "Went from skinny-fat to stage-ready in 18 months", quote: "He's direct, sometimes brutal, always right. Worth every penny." },
    ],
    reviewsList: [
      { author: "Sean M.", rating: 5, text: "The most knowledgeable coach I've ever worked with. His contest prep protocol is a science." },
      { author: "Lisa T.", rating: 5, text: "I was skeptical of online coaching but Marcus changed my mind completely." },
      { author: "Damon R.", rating: 4, text: "Great results, high standards. Not for people who want hand-holding." },
    ],
    img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
  },
  {
    id: 5, name: "Lena Kowalski", handle: "@lenarunswild", specialty: "Running & Endurance", niche: "cardio",
    tagline: "From couch to finish line. Scientifically.",
    bio: "Olympic Trials qualifier (2016, 2020) and exercise science graduate. I've run over 60,000 miles in my career and coached runners from their first 5K to sub-3 marathons and 100-mile ultras. I'm a heart rate nerd who believes in data-driven training — easy days easy, hard days hard — and I'll show you why most runners plateau.",
    experience: "10 years", responseTime: "Within 12 hours",
    platforms: { instagram: "93K", youtube: "44K" },
    price: "$$", priceRange: "$110–$175/mo",
    pricing: [
      { tier: "Base", price: "$110/mo", includes: ["Weekly training plan via TrainingPeaks", "Monthly video call", "Race-specific pacing strategy", "HR zone guidance"] },
      { tier: "Performance", price: "$150/mo", includes: ["Daily plan adjustments", "Bi-weekly calls", "Strength training integration", "Full race season planning"] },
      { tier: "Elite", price: "$175/mo", includes: ["Daily coaching contact", "Gait analysis review", "Altitude/heat training protocols", "Sponsor support"] },
    ],
    certifications: ["USATF Level 2 Coach", "ACSM Exercise Physiologist", "TrainingPeaks Certified Coach"],
    rating: 4.85, reviews: 88, location: "Boulder, CO",
    tags: ["Running", "Endurance", "Marathon", "Trail"], coachingMode: "both", style: "data-driven",
    coachingIncludes: ["TrainingPeaks integration", "Heart rate zone training", "Race-specific programming", "Strength & mobility plans", "Nutrition for endurance"],
    successStories: [
      { name: "Paul H.", result: "Qualified for Boston Marathon (BQ by 9 minutes)", quote: "Lena's polarized training approach felt counterintuitive but delivered in a huge way." },
      { name: "Sarah M.", result: "Finished first 50-mile ultra", quote: "She prepared me for every mile, including the miles where you want to quit." },
      { name: "Kevin T.", result: "Dropped marathon PR from 4:12 to 3:38", quote: "The data doesn't lie. Her method works." },
    ],
    reviewsList: [
      { author: "Amy R.", rating: 5, text: "The most evidence-based running coaching I've encountered. Everything is purposeful." },
      { author: "Brian S.", rating: 5, text: "After two injury-plagued years I finally ran a full season healthy." },
      { author: "Carol J.", rating: 4, text: "The plans can be intense but she adjusts when life gets in the way." },
    ],
    img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80",
  },
  {
    id: 6, name: "Darius Kim", handle: "@dariusmoves", specialty: "Calisthenics & Movement", niche: "calisthenics",
    tagline: "Your body is all the equipment you need.",
    bio: "I went from a completely sedentary desk job to a handstand in 12 months with nothing but a pull-up bar and floor space. That journey turned into a mission — teaching people to master their own bodyweight. I've built a community of 1M+ across platforms and coached thousands to their first muscle-up, handstand, and human flag. No gym required, ever.",
    experience: "5 years", responseTime: "Same day",
    platforms: { instagram: "260K", tiktok: "880K", youtube: "130K" },
    price: "$", priceRange: "$40–$75/mo",
    pricing: [
      { tier: "Foundation", price: "$40/mo", includes: ["Beginner bodyweight program", "Video tutorial library", "Community forum access"] },
      { tier: "Movement", price: "$65/mo", includes: ["Progressive skill program", "Monthly 1-on-1 session", "Form feedback via video", "Community + direct chat"] },
      { tier: "Mastery", price: "$75/mo", includes: ["Custom skill roadmap", "Bi-weekly sessions", "Handstand/planche/lever tracks", "Priority coaching access"] },
    ],
    certifications: ["NASM-CPT", "FRC Mobility Specialist", "Animal Flow Certified"],
    rating: 4.75, reviews: 530, location: "New York, NY",
    tags: ["Calisthenics", "No Equipment", "Handstands", "Flexibility"], coachingMode: "online", style: "supportive",
    coachingIncludes: ["Progressive skill programming", "Video tutorial library", "1-on-1 video sessions", "Form analysis", "Community access"],
    successStories: [
      { name: "Tom B.", result: "Achieved first freestanding handstand at age 41", quote: "I thought handstands were for gymnasts. Darius proved me wrong in 4 months." },
      { name: "Nina S.", result: "First muscle-up after 6 weeks of programming", quote: "The progressions are genius. You never feel stuck." },
      { name: "James L.", result: "Lost 30 lbs and learned 5 calisthenics skills", quote: "Best decision I made during lockdown. Still training with him 3 years later." },
    ],
    reviewsList: [
      { author: "Felix O.", rating: 5, text: "Darius breaks down complex movements into digestible progressions. The skill tracks are exceptional." },
      { author: "Maria V.", rating: 5, text: "Supportive, fun, and incredibly knowledgeable. The community is also amazing." },
      { author: "Andrew P.", rating: 4, text: "Great value. The self-guided content is extensive." },
    ],
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
  },
  {
    id: 7, name: "Sofia Alvarez", handle: "@sofianutrition", specialty: "Nutrition & Weight Loss", niche: "nutrition",
    tagline: "No crash diets. No supplements. Just food that works.",
    bio: "Registered Dietitian and Certified Personal Trainer with a master's in nutritional sciences. I've worked in clinical settings, sports nutrition, and private coaching for over a decade. My approach is anti-diet — I don't believe in restriction for its own sake. I help clients find sustainable eating patterns that fit their actual life, not a fantasy version of it.",
    experience: "11 years", responseTime: "Within 8 hours",
    platforms: { instagram: "144K", tiktok: "320K" },
    price: "$$", priceRange: "$120–$200/mo",
    pricing: [
      { tier: "Foundations", price: "$120/mo", includes: ["Initial diet assessment", "Custom macro targets", "Meal planning templates", "Monthly check-in call"] },
      { tier: "Transformation", price: "$165/mo", includes: ["Full nutrition plan", "Bi-weekly calls", "Grocery lists & meal prep guides", "Body composition tracking"] },
      { tier: "Full Support", price: "$200/mo", includes: ["Daily accountability", "Lab result interpretation", "Supplement protocol", "Lifestyle & stress coaching"] },
    ],
    certifications: ["Registered Dietitian (RD)", "CPT (NASM)", "MS Nutritional Sciences"],
    rating: 4.9, reviews: 276, location: "Chicago, IL",
    tags: ["Nutrition", "Weight Loss", "Sustainable", "Meal Planning"], coachingMode: "both", style: "holistic",
    coachingIncludes: ["Custom meal plans", "Macro & calorie coaching", "Grocery & meal prep guides", "Lab result review", "Mindful eating support"],
    successStories: [
      { name: "Rachel K.", result: "Lost 55 lbs without ever feeling deprived", quote: "Sofia taught me that eating well doesn't mean eating less. That mindset shift changed everything." },
      { name: "Carlos M.", result: "Reversed pre-diabetes through diet alone", quote: "Her clinical background made her uniquely qualified to help with my situation." },
      { name: "Emily S.", result: "Healed her relationship with food after years of disordered eating", quote: "She's not just a nutrition coach — she's a life coach." },
    ],
    reviewsList: [
      { author: "Tanya H.", rating: 5, text: "Finally a nutritionist who doesn't make you feel like a failure for eating a slice of pizza." },
      { author: "Bobby R.", rating: 5, text: "The meal plans are realistic, delicious, and actually help you lose weight." },
      { author: "Natalie F.", rating: 5, text: "Worth every penny. The investment in my health paid for itself in lower medical bills." },
    ],
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
  },
  {
    id: 8, name: "Tyler Brooks", handle: "@tylerathlete", specialty: "Athletic Performance", niche: "performance",
    tagline: "Elite sports science. For everyone.",
    bio: "Strength and conditioning coach with a decade of experience working with professional athletes across the NFL, NBA, and MLS. I've designed training programs for combine prep, in-season maintenance, and post-injury return-to-sport. Now I bring those same methodologies to everyday athletes who want to train smarter and perform better.",
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
    tags: ["Athletic Performance", "Speed", "Agility", "Sports Science"], coachingMode: "both", style: "data-driven",
    coachingIncludes: ["Periodized performance programming", "Speed & power development", "Injury prevention protocols", "Recovery optimization", "Performance testing"],
    successStories: [
      { name: "Marcus J.", result: "Improved 40-yard dash from 4.7 to 4.51", quote: "Tyler's understanding of the nervous system and power development is on another level." },
      { name: "Kayla T.", result: "Made varsity soccer team after 3 months", quote: "He turned me into a completely different athlete." },
      { name: "Derek O.", result: "Returned from ACL surgery 6 weeks ahead of schedule", quote: "His return-to-sport protocol was methodical and gave me full confidence." },
    ],
    reviewsList: [
      { author: "Jason M.", rating: 5, text: "Tyler's approach is miles ahead of any S&C coach I've worked with." },
      { author: "Brianna S.", rating: 5, text: "Measurable improvements in every tested metric within 8 weeks." },
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
    tags: ["Pilates", "Core", "Postpartum", "Back Pain"], coachingMode: "both", style: "supportive",
    coachingIncludes: ["Mat & reformer programming", "Core rehabilitation", "Postpartum recovery protocols", "Back pain management", "Breathwork & alignment"],
    successStories: [
      { name: "Amanda H.", result: "Fully recovered from diastasis recti in 12 weeks", quote: "Zoe knew exactly what my postpartum body needed. I'm stronger now than before pregnancy." },
      { name: "Michael T.", result: "Resolved chronic lower back pain of 7 years", quote: "She found the weakness nobody else found. Three months later I'm pain-free." },
      { name: "Sophie L.", result: "Returned to dance after hip injury", quote: "Her understanding of functional movement is exceptional." },
    ],
    reviewsList: [
      { author: "Dana R.", rating: 5, text: "Zoe is a true specialist. Her knowledge of postpartum recovery is unmatched." },
      { author: "Robert K.", rating: 5, text: "I was skeptical about Pilates for a 45-year-old man with back issues. Completely wrong." },
      { author: "Michelle P.", rating: 5, text: "The most effective core work I've ever done. Results visible within 3 weeks." },
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
    tags: ["CrossFit", "Functional Fitness", "WODs", "Community"], coachingMode: "both", style: "tough love",
    coachingIncludes: ["Daily WOD programming", "Skill development", "Mobility work", "Community access", "Competition prep"],
    successStories: [
      { name: "Natasha P.", result: "Competed in first CrossFit Open after 6 months", quote: "Rex made me feel like I belonged in competitive fitness." },
      { name: "Ben M.", result: "Achieved first Rx WOD after 3 months", quote: "The progressions and scaling options are perfect. Never felt left behind." },
      { name: "Karla S.", result: "Lost 28 lbs while gaining strength", quote: "CrossFit with good coaching is transformative. Rex is great coaching." },
    ],
    reviewsList: [
      { author: "Tom P.", rating: 5, text: "Rex builds community even in an online setting. The Slack group is active and motivating." },
      { author: "Jenny L.", rating: 4, text: "Intense but fair. He pushes you hard but respects your current level." },
      { author: "Mike D.", rating: 5, text: "Best programming I've followed. Constantly varied, always purposeful." },
    ],
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
  },
  {
    id: 11, name: "Amara Osei", handle: "@amaraboxfit", specialty: "Boxing & Combat Fitness", niche: "hiit",
    tagline: "Hit harder. Feel stronger. Own the room.",
    bio: "Former professional boxer with an 18-5 record and 3 regional titles. After retiring, I found my calling coaching everyday people to use boxing as a vehicle for physical and mental transformation. My clients aren't trying to fight — they're trying to build confidence, burn fat, and learn skills that make them feel powerful in their bodies.",
    experience: "7 years", responseTime: "Same day",
    platforms: { instagram: "321K", tiktok: "740K" },
    price: "$", priceRange: "$55–$95/mo",
    pricing: [
      { tier: "Fundamentals", price: "$55/mo", includes: ["Boxing basics program", "Shadowboxing routines", "Conditioning workouts", "Video feedback (1x/mo)"] },
      { tier: "Fighter", price: "$80/mo", includes: ["Advanced boxing program", "Sparring prep", "Bi-weekly check-ins", "Conditioning + strength integration"] },
      { tier: "Champion", price: "$95/mo", includes: ["Full fight prep or advanced fitness program", "Weekly coaching calls", "Nutrition coaching", "Mental performance tools"] },
    ],
    certifications: ["USA Boxing Certified Coach", "ACE-CPT", "Mental Performance Specialist"],
    rating: 4.8, reviews: 415, location: "Philadelphia, PA",
    tags: ["Boxing", "Combat Fitness", "Confidence", "Fat Loss"], coachingMode: "both", style: "tough love",
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
    bio: "Certified pre/postnatal fitness specialist and former labor and delivery nurse with 10 years of clinical experience. I combine medical knowledge with practical fitness coaching to help pregnant and postpartum women stay strong, safe, and confident in their bodies throughout the entire journey.",
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
    tags: ["Prenatal", "Postpartum", "Core Restore", "Safe Pregnancy"], coachingMode: "online", style: "supportive",
    coachingIncludes: ["Trimester-specific programming", "Pelvic floor guidance", "Core rehabilitation", "Birth preparation", "Postpartum recovery"],
    successStories: [
      { name: "Megan S.", result: "Active through entire pregnancy, recovered in 6 weeks", quote: "Claire's training literally changed my birth experience. My OB was amazed at my recovery." },
      { name: "Tara B.", result: "Healed diastasis recti and returned to running at 4 months postpartum", quote: "Her clinical background made me feel completely safe." },
      { name: "Kate W.", result: "No back pain during third trimester", quote: "I wish I'd found her with my first pregnancy. Night and day difference." },
    ],
    reviewsList: [
      { author: "Hannah R.", rating: 5, text: "Claire is the only fitness professional I'd trust with prenatal coaching. Her medical background is invaluable." },
      { author: "Olivia M.", rating: 5, text: "She made me feel powerful and safe throughout my entire pregnancy." },
      { author: "Jessica T.", rating: 5, text: "My doctor recommended her. My body thanked me. Five stars isn't enough." },
    ],
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
  },
  {
    id: 13, name: "Gene Harlow", handle: "@genefit55plus", specialty: "Senior & Longevity Fitness", niche: "performance",
    tagline: "72 years old and still deadlifting. You're next.",
    bio: "I'm 72 years old, still deadlifting over 300 lbs, and I've been coaching adults 55+ for 15 years. I spent my career as a physical education professor before pivoting to longevity coaching after watching too many of my peers decline when they didn't have to. Strength, balance, bone density, and cognitive sharpness — all trainable at any age. I'm living proof.",
    experience: "15 years", responseTime: "Within 24 hours",
    platforms: { instagram: "64K", youtube: "110K" },
    price: "$", priceRange: "$50–$90/mo",
    pricing: [
      { tier: "Vitality", price: "$50/mo", includes: ["Age-appropriate strength program", "Balance & fall prevention protocols", "Monthly check-in call"] },
      { tier: "Longevity", price: "$75/mo", includes: ["Custom 3-day program", "Bi-weekly coaching calls", "Mobility & joint health focus", "Nutrition for healthy aging"] },
      { tier: "Strong to 100", price: "$90/mo", includes: ["Fully personalized plan", "Weekly sessions", "Bone density & hormone guidance", "Lifestyle coaching"] },
    ],
    certifications: ["ACSM Certified Exercise Physiologist", "ACE Senior Fitness Specialist", "PhD Physical Education"],
    rating: 4.95, reviews: 77, location: "Scottsdale, AZ",
    tags: ["Senior Fitness", "Longevity", "Balance", "55+"], coachingMode: "both", style: "supportive",
    coachingIncludes: ["Age-appropriate strength programming", "Balance & stability work", "Bone density protocols", "Joint health focus", "Longevity nutrition guidance"],
    successStories: [
      { name: "Barbara W.", result: "No longer needs a cane after 6 months of training", quote: "Gene gave me my independence back. I hike again at 68." },
      { name: "Frank T.", result: "Reversed osteopenia diagnosis through resistance training", quote: "My doctor called the bone density results remarkable. Gene called it expected." },
      { name: "Shirley M.", result: "Lost 30 lbs and improved cognitive test scores at 71", quote: "I feel 20 years younger. That's not a cliché — it's measurable." },
    ],
    reviewsList: [
      { author: "Harold B.", rating: 5, text: "Gene understands the aging body at a level that makes other trainers look like amateurs." },
      { author: "Dorothy S.", rating: 5, text: "Kind, patient, brilliant. He meets you where you are and moves you forward safely." },
      { author: "Walter K.", rating: 5, text: "Started at 67 with chronic knee pain. Now squatting pain-free at 69. Remarkable." },
    ],
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
  },
  {
    id: 14, name: "Bianca Torres", handle: "@biancadancefit", specialty: "Dance Fitness & Zumba", niche: "cardio",
    tagline: "If you hate the gym, come dance with us instead.",
    bio: "Master Zumba Instructor and former professional Latin dancer with 500,000+ community members worldwide. I've taught in 14 countries and certified over 200 instructors. My philosophy is simple: exercise should be the best part of your day. If you dread your workout, you won't stick to it. I built a community where people show up because they genuinely can't wait to.",
    experience: "14 years", responseTime: "Same day",
    platforms: { instagram: "498K", tiktok: "1.8M", youtube: "210K" },
    price: "$", priceRange: "$35–$70/mo",
    pricing: [
      { tier: "Party Pass", price: "$35/mo", includes: ["Live weekly Zumba classes (3x/week)", "On-demand library (500+ classes)", "Community access"] },
      { tier: "Dance & Tone", price: "$55/mo", includes: ["Everything in Party Pass", "Strength-through-dance programs", "Bi-monthly 1-on-1 check-ins"] },
      { tier: "Elite", price: "$70/mo", includes: ["Unlimited live classes", "Personal dance fitness plan", "Monthly coaching call", "Nutrition guidance"] },
    ],
    certifications: ["Zumba Master Trainer", "ACE Group Fitness Instructor", "AFAA Primary Group Exercise Certified"],
    rating: 4.7, reviews: 1240, location: "San Antonio, TX",
    tags: ["Zumba", "Dance", "Cardio", "Beginner Friendly"], coachingMode: "online", style: "supportive",
    coachingIncludes: ["Live weekly dance classes", "On-demand class library", "Dance fitness programming", "Community support", "Beginner-friendly modifications"],
    successStories: [
      { name: "Maria G.", result: "Lost 50 lbs over 14 months without ever feeling like she was exercising", quote: "I've tried every diet and gym program. Nothing stuck until Bianca. It's just fun." },
      { name: "Robert F.", result: "Husband dragged along by wife — now attends more classes than her", quote: "I showed up once to support my wife. Now I haven't missed a class in 8 months." },
      { name: "Angela T.", result: "Lowered blood pressure from hypertensive to normal range", quote: "My cardiologist asked what I changed. I told him I started dancing 4 days a week." },
    ],
    reviewsList: [
      { author: "Carmen L.", rating: 5, text: "Bianca's energy is literally infectious. The community she's built is the most positive space on the internet." },
      { author: "Tony S.", rating: 5, text: "I've lost 35 lbs and made real friends. Never expected that from an online fitness program." },
      { author: "Elena M.", rating: 4, text: "So fun and effective. Classes run a tight 45 minutes which is perfect for my schedule." },
    ],
    img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&q=80",
  },
  {
    id: 15, name: "Ethan Yoo", handle: "@ethankettlebell", specialty: "Kettlebell & Functional Strength", niche: "strength",
    tagline: "The most efficient tool in fitness. I'll prove it in 30 days.",
    bio: "StrongFirst certified instructor and kettlebell evangelist. I discovered kettlebells after a back injury ended my barbell training — and found that two bells and a small space gave me better results than any fully-equipped gym. I've since trained hundreds of clients online, from complete beginners to firefighters, military personnel, and competitive athletes who needed to maximize performance with minimal equipment.",
    experience: "7 years", responseTime: "Within 8 hours",
    platforms: { instagram: "143K", youtube: "67K" },
    price: "$$", priceRange: "$95–$155/mo",
    pricing: [
      { tier: "Swing", price: "$95/mo", includes: ["Foundational kettlebell program", "Technique video library", "Monthly check-in", "Equipment recommendations"] },
      { tier: "Press", price: "$125/mo", includes: ["Progressive 3-day program", "Bi-weekly coaching calls", "Strength & conditioning integration", "Form video feedback"] },
      { tier: "Snatch", price: "$155/mo", includes: ["Advanced programming", "Weekly sessions", "Competition prep (if applicable)", "Full mobility & recovery protocol"] },
    ],
    certifications: ["StrongFirst SFG Level 2", "NASM-CPT", "Functional Movement Screen Certified"],
    rating: 4.85, reviews: 189, location: "Minneapolis, MN",
    tags: ["Kettlebell", "Functional Strength", "Minimalist", "Home Workouts"], coachingMode: "online", style: "data-driven",
    coachingIncludes: ["Kettlebell technique coaching", "Progressive strength programming", "Mobility & recovery protocols", "Form video analysis", "Equipment guidance"],
    successStories: [
      { name: "Dave M.", result: "Rehabbed lower back and is now stronger than pre-injury", quote: "Ethan saved my back and gave me a training practice I can maintain for life." },
      { name: "Sarah K.", result: "Lost 25 lbs training 3 days/week from her garage", quote: "Two kettlebells and 45 minutes. I'm in the best shape of my life at 38." },
      { name: "Jake T.", result: "Passed military fitness test on first attempt after 8 weeks", quote: "The conditioning work is brutal and effective. Exactly what I needed." },
    ],
    reviewsList: [
      { author: "Phil H.", rating: 5, text: "Ethan's technical knowledge of kettlebell movement is elite. My swing has never been better." },
      { author: "Karen S.", rating: 5, text: "Minimalist equipment, maximum results. His programming philosophy is brilliant." },
      { author: "Marcus R.", rating: 4, text: "Great coach. Demanding but patient. My grip strength has improved by an embarrassing amount." },
    ],
    img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&q=80",
  },
  {
    id: 16, name: "Naomi Adkins", handle: "@naomistretches", specialty: "Flexibility & Mobility Coaching", niche: "yoga",
    tagline: "Stiff adults welcome. Splits optional.",
    bio: "Former competitive gymnast and flexibility coach who spent 20 years being naturally flexible before realizing I had no idea how to help stiff people. So I spent 3 years studying the science — PNF stretching, loaded flexibility, fascia research — and built a methodology specifically for adults who feel tight, locked up, and skeptical that anything will actually work. It does.",
    experience: "8 years", responseTime: "Within 12 hours",
    platforms: { instagram: "234K", tiktok: "920K", youtube: "77K" },
    price: "$", priceRange: "$45–$85/mo",
    pricing: [
      { tier: "Unlock", price: "$45/mo", includes: ["Daily stretching protocol", "Video library (300+ routines)", "Community access"] },
      { tier: "Mobilize", price: "$70/mo", includes: ["Custom flexibility assessment", "Personal mobility roadmap", "Bi-weekly check-ins", "Progress tracking"] },
      { tier: "Full Splits", price: "$85/mo", includes: ["Splits-specific program", "Weekly coaching sessions", "Loaded flexibility protocols", "Recovery guidance"] },
    ],
    certifications: ["USAG Level 5 Gymnastics Coach", "FRC Mobility Specialist", "NASM Corrective Exercise Specialist"],
    rating: 4.8, reviews: 564, location: "Nashville, TN",
    tags: ["Flexibility", "Stretching", "Splits", "Desk Worker Recovery"], coachingMode: "online", style: "holistic",
    coachingIncludes: ["Flexibility assessment", "Custom stretching protocols", "Loaded flexibility training", "Daily mobility routines", "Desk worker recovery programs"],
    successStories: [
      { name: "Greg P.", result: "Achieved front splits at age 44 after 5 months", quote: "I was the most inflexible person I knew. Naomi turned that into a challenge, not a limitation." },
      { name: "Lisa C.", result: "Eliminated chronic hip tightness from 8 years of desk work", quote: "20 minutes a day changed my quality of life completely." },
      { name: "Ryan W.", result: "Improved squat depth and eliminated knee pain in 6 weeks", quote: "The mobility work she prescribed fixed my squat more than any cue from any strength coach." },
    ],
    reviewsList: [
      { author: "Sandra T.", rating: 5, text: "Naomi makes flexibility accessible for actual humans, not just naturally bendy people." },
      { author: "Chris B.", rating: 5, text: "Her TikToks got me started and her programming kept me going. The results are real." },
      { author: "Michelle K.", rating: 4, text: "Incredibly knowledgeable and the progressions are perfectly calibrated. Worth the investment." },
    ],
    img: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=400&q=80",
  },
  {
    id: 17, name: "Cole Andersen", handle: "@coleolympiclifts", specialty: "Olympic Weightlifting", niche: "strength",
    tagline: "From squat rack to snatch platform.",
    bio: "Team USA development coach and former international competitor with 12 years on the platform. I've coached athletes from their first power clean to podium finishes at national competitions. Olympic lifting is the most technically demanding sport in fitness — and the most rewarding to learn. I take athletes of all backgrounds and build them into technical lifters.",
    experience: "12 years", responseTime: "Within 8 hours",
    platforms: { instagram: "88K", youtube: "120K" },
    price: "$$$", priceRange: "$160–$250/mo",
    pricing: [
      { tier: "Foundation", price: "$160/mo", includes: ["Olympic lifting technique program", "Video analysis (weekly)", "Bi-weekly coaching calls", "Accessory programming"] },
      { tier: "Platform", price: "$200/mo", includes: ["Full competition programming", "Weekly technique sessions", "Meet prep & attempt selection", "Strength & mobility integration"] },
      { tier: "National", price: "$250/mo", includes: ["Elite periodization", "Daily coaching contact", "Travel & competition support", "Mental performance coaching"] },
    ],
    certifications: ["USAW Level 2 Coach", "NSCA-CSCS", "Team USA Development Staff"],
    rating: 4.9, reviews: 61, location: "Colorado Springs, CO",
    tags: ["Olympic Lifting", "Snatch", "Clean & Jerk", "Technical"], coachingMode: "both", style: "data-driven",
    coachingIncludes: ["Olympic lifting technique coaching", "Video analysis", "Competition programming", "Meet prep & attempt selection", "Strength & mobility work"],
    successStories: [
      { name: "James K.", result: "Qualified for USAW Senior Nationals in first year of competition", quote: "Cole's technical eye is extraordinary. My snatch went from a disaster to a thing of beauty." },
      { name: "Maria S.", result: "Set three state records in first competition", quote: "He builds you correctly from the start. No bad habits to undo." },
      { name: "Tyler B.", result: "CrossFit athlete added 30kg to competition total in 6 months", quote: "My Olympic lifting was the weakest part of my game. Not anymore." },
    ],
    reviewsList: [
      { author: "Patrick D.", rating: 5, text: "Cole is among the top technical coaches in the country. The video analysis feedback is incredibly detailed." },
      { author: "Anna K.", rating: 5, text: "Patient, precise, and passionate. He makes you fall in love with the sport." },
      { author: "Ben S.", rating: 4, text: "Demanding coach with extremely high standards. If you want to be a real lifter, he's your guy." },
    ],
    img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80",
  },
  {
    id: 18, name: "Jade Williams", handle: "@jadementalfit", specialty: "Mindful Fitness & Mental Health", niche: "yoga",
    tagline: "Exercise as medicine. Backed by science.",
    bio: "Licensed therapist and certified personal trainer — a combination that gives me a perspective most coaches don't have. I've spent a decade researching and practicing the intersection of movement and mental health. My clients come to me burned out, anxious, or depressed and leave with sustainable fitness habits and measurably better mental health outcomes.",
    experience: "10 years", responseTime: "Within 12 hours",
    platforms: { instagram: "155K", youtube: "93K" },
    price: "$$", priceRange: "$110–$180/mo",
    pricing: [
      { tier: "Mindful", price: "$110/mo", includes: ["Mood-matched training program", "Weekly mindfulness practices", "Mental health check-ins", "Stress management tools"] },
      { tier: "Integrated", price: "$145/mo", includes: ["Custom fitness + wellness plan", "Bi-weekly coaching sessions", "CBT-informed goal setting", "Sleep & recovery optimization"] },
      { tier: "Therapy+", price: "$180/mo", includes: ["Everything in Integrated", "Weekly 1-on-1 sessions", "Trauma-informed movement protocols", "Full lifestyle design support"] },
    ],
    certifications: ["Licensed Professional Counselor (LPC)", "NASM-CPT", "Certified Yoga Therapist"],
    rating: 4.97, reviews: 208, location: "Atlanta, GA",
    tags: ["Mental Health", "Mindful Fitness", "Anxiety", "Burnout Recovery"], coachingMode: "online", style: "holistic",
    coachingIncludes: ["Mood-matched programming", "Mindfulness & meditation practices", "CBT-informed coaching", "Sleep optimization", "Stress & burnout recovery protocols"],
    successStories: [
      { name: "Kevin L.", result: "Stopped antidepressants after 8 months of training (with doctor supervision)", quote: "Jade helped me understand that movement was medicine. My psychiatrist agreed." },
      { name: "Sarah T.", result: "Recovered from severe burnout and built a sustainable wellness routine", quote: "She understood my psychology and my body simultaneously. That combination is rare." },
      { name: "Mike H.", result: "Anxiety reduced by 60% on standardized assessments after 12 weeks", quote: "I came for fitness and got my life back." },
    ],
    reviewsList: [
      { author: "Alicia P.", rating: 5, text: "Jade operates at the intersection of evidence-based therapy and fitness. There is nobody else doing what she does." },
      { author: "Derek M.", rating: 5, text: "She holds space for you in a way that feels therapeutic while also pushing you physically." },
      { author: "Tamara S.", rating: 5, text: "I was burned out and broken. 6 months later I'm running half marathons and sleeping well. She's magic." },
    ],
    img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&q=80",
  },
  {
    id: 19, name: "Marco Bellini", handle: "@marcotricoach", specialty: "Triathlon & Endurance Sports", niche: "cardio",
    tagline: "Ironman 11 times over. Now coaching yours.",
    bio: "Ironman finisher 11 times over with a personal best of 9:41. I've coached over 200 triathletes — from first sprint distances to Kona qualifiers. Triathlon is a sport of balance: training all three disciplines, managing fatigue, and peaking on race day. I specialize in 12-month periodized programs that get age-groupers to their A-race feeling fresh, not destroyed.",
    experience: "11 years", responseTime: "Within 12 hours",
    platforms: { instagram: "71K", youtube: "48K" },
    price: "$$$", priceRange: "$175–$280/mo",
    pricing: [
      { tier: "Sprint", price: "$175/mo", includes: ["Sprint/Olympic distance plan", "TrainingPeaks integration", "Monthly calls", "Swim/bike/run programming"] },
      { tier: "Iron", price: "$225/mo", includes: ["Half/Full Ironman program", "Weekly check-ins", "Race nutrition strategy", "Transition practice protocols"] },
      { tier: "Kona", price: "$280/mo", includes: ["Kona qualifier programming", "Daily coaching", "Full race season planning", "Mental race prep"] },
    ],
    certifications: ["USAT Level 2 Triathlon Coach", "TrainingPeaks Certified Coach", "NASM-CPT"],
    rating: 4.88, reviews: 94, location: "Tucson, AZ",
    tags: ["Triathlon", "Ironman", "Cycling", "Swimming"], coachingMode: "online", style: "data-driven",
    coachingIncludes: ["Triathlon-specific programming", "Swim/bike/run coaching", "Race nutrition planning", "TrainingPeaks integration", "Recovery periodization"],
    successStories: [
      { name: "Lisa H.", result: "Completed first full Ironman at 44 years old", quote: "Marco's structured approach made a 140.6 mile race feel manageable. I crossed the finish line in tears." },
      { name: "Tom R.", result: "Qualified for Kona on second Ironman attempt", quote: "His race execution strategy alone is worth the coaching fee." },
      { name: "Sandra K.", result: "Improved Ironman time by 1hr 22min in one season", quote: "The data-driven approach finally made sense of my training. Huge gains in year two." },
    ],
    reviewsList: [
      { author: "Phil M.", rating: 5, text: "Marco's knowledge of triathlon periodization is world-class. My third Ironman was my best by far." },
      { author: "Donna S.", rating: 5, text: "He's coached me through three Ironman events. I wouldn't dream of doing another without him." },
      { author: "Eric B.", rating: 4, text: "Demanding but results-oriented. He communicates clearly and adjusts plans when life happens." },
    ],
    img: "https://images.unsplash.com/photo-1530143311094-34d807799e8f?w=400&q=80",
  },
  {
    id: 20, name: "Fatima Hassan", handle: "@fatimaplanteats", specialty: "Plant-Based Nutrition & Fitness", niche: "nutrition",
    tagline: "You don't need meat to build muscle. Let me show you.",
    bio: "Registered Dietitian specializing in plant-based performance nutrition. I went vegan at 19 and spent years learning how to fuel athletic performance without animal products — back when there was almost no guidance available. Now I help athletes, recreational exercisers, and people transitioning away from meat build muscle, improve performance, and feel great on a plant-based diet.",
    experience: "9 years", responseTime: "Within 8 hours",
    platforms: { instagram: "199K", tiktok: "560K" },
    price: "$$", priceRange: "$105–$180/mo",
    pricing: [
      { tier: "Plant Basics", price: "$105/mo", includes: ["Plant-based macro targets", "Protein-complete meal planning", "Supplement stack guidance", "Monthly check-in"] },
      { tier: "Performance", price: "$145/mo", includes: ["Sport-specific nutrition plan", "Bi-weekly coaching", "Blood panel interpretation", "Gut health protocols"] },
      { tier: "Elite", price: "$180/mo", includes: ["Full athletic nutrition programming", "Weekly sessions", "Periodized plant-based fueling", "Race/event nutrition strategy"] },
    ],
    certifications: ["Registered Dietitian (RD)", "Sports Dietitian (CSSD)", "Precision Nutrition L2"],
    rating: 4.82, reviews: 317, location: "Oakland, CA",
    tags: ["Vegan", "Plant-Based", "Sports Nutrition", "Muscle Building"], coachingMode: "online", style: "holistic",
    coachingIncludes: ["Plant-based meal planning", "Performance nutrition protocols", "Supplement guidance", "Blood panel review", "Gut health optimization"],
    successStories: [
      { name: "Alex R.", result: "Added 18 lbs of muscle in one year on a fully vegan diet", quote: "Fatima proved every skeptic wrong including me. The protein sources she recommended were game-changers." },
      { name: "Nina T.", result: "Set marathon PR eating exclusively plant-based", quote: "I was terrified to transition away from meat during training. Her guidance made it seamless." },
      { name: "Jordan M.", result: "Resolved chronic digestive issues while improving athletic performance", quote: "She fixed my gut and my training simultaneously. That combination was everything." },
    ],
    reviewsList: [
      { author: "Sam B.", rating: 5, text: "Fatima knows plant-based sports nutrition better than anyone I've encountered. The meal plans are delicious and effective." },
      { author: "Laura K.", rating: 5, text: "I was struggling with energy on my plant-based diet. She identified the gaps in under a week." },
      { author: "Devon P.", rating: 4, text: "Very knowledgeable and approachable. Some of the specialty foods she recommends aren't easy to find but she offers alternatives." },
    ],
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  },
  {
    id: 21, name: "Derek Okafor", handle: "@derekmobility", specialty: "Injury Recovery & Rehab Fitness", niche: "yoga",
    tagline: "Bridge the gap between physical therapy and the gym floor.",
    bio: "Doctor of Physical Therapy and strength coach who got frustrated watching patients leave PT clinics before they were truly ready to return to sport or exercise. I built a coaching practice specifically for the phase between 'cleared by PT' and 'back to full training' — helping people rebuild confidence, regain strength, and stop getting reinjured through smart progressive loading.",
    experience: "8 years", responseTime: "Within 8 hours",
    platforms: { instagram: "117K", youtube: "84K" },
    price: "$$$", priceRange: "$165–$260/mo",
    pricing: [
      { tier: "Rehab", price: "$165/mo", includes: ["Post-PT return-to-exercise program", "Weekly check-ins", "Pain monitoring protocols", "Movement assessment"] },
      { tier: "Rebuild", price: "$210/mo", includes: ["Full rehab-to-performance bridge program", "Bi-weekly sessions", "Sport-specific re-entry plan", "Strength benchmarking"] },
      { tier: "Resilient", price: "$260/mo", includes: ["Injury prevention programming", "Daily coaching access", "Biomechanical video analysis", "Long-term movement health plan"] },
    ],
    certifications: ["Doctor of Physical Therapy (DPT)", "NSCA-CSCS", "DNS Certified Practitioner"],
    rating: 4.93, reviews: 135, location: "Houston, TX",
    tags: ["Injury Recovery", "Rehab", "Pain-Free Movement", "Return to Sport"], coachingMode: "both", style: "data-driven",
    coachingIncludes: ["Post-PT rehabilitation programming", "Return-to-sport protocols", "Biomechanical analysis", "Injury prevention programming", "Pain monitoring & management"],
    successStories: [
      { name: "Chris M.", result: "Returned to competitive powerlifting 4 months after spinal fusion", quote: "My surgeon said to stop lifting. Derek showed me how to lift smarter. I'm now stronger than pre-surgery." },
      { name: "Amy L.", result: "First pain-free year in 6 years after chronic knee issues", quote: "Three surgeries and five PT clinics. Derek fixed what they couldn't." },
      { name: "Paul G.", result: "Returned to marathon running after Achilles repair", quote: "His progressive loading approach gave me back the sport I love." },
    ],
    reviewsList: [
      { author: "Karen H.", rating: 5, text: "Derek has a clinical mind and a coaching heart. That combination is extraordinarily rare." },
      { author: "Mark S.", rating: 5, text: "He treated my injury like a puzzle to solve, not a liability to manage. Finally someone who helped." },
      { author: "Diane T.", rating: 5, text: "Worth every dollar. He gave me back my quality of life after years of pain." },
    ],
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
  },
  {
    id: 22, name: "Sierra Monroe", handle: "@sierracycleco", specialty: "Indoor Cycling & Cardio", niche: "cardio",
    tagline: "45 minutes. Full drip. Zero regrets.",
    bio: "Master spin instructor with 8 years and over 4,000 classes taught. I've instructed at top studios in LA and NYC before building my own online platform. My classes run on the philosophy that great music + great coaching + great community = the workout you actually look forward to. I build riders from complete beginners to athletes who use cycling as serious cross-training.",
    experience: "8 years", responseTime: "Within 6 hours",
    platforms: { instagram: "88K", tiktok: "430K" },
    price: "$", priceRange: "$40–$75/mo",
    pricing: [
      { tier: "Ride", price: "$40/mo", includes: ["3 live classes per week", "On-demand library (200+ rides)", "Community access"] },
      { tier: "Sprint", price: "$60/mo", includes: ["Unlimited live classes", "Structured cycling programs", "Monthly coaching call", "Heart rate training guidance"] },
      { tier: "Podium", price: "$75/mo", includes: ["Everything in Sprint", "Custom cycling plan", "Cross-training programming", "Nutrition for cycling"] },
    ],
    certifications: ["Mad Dogg Athletics Master Instructor", "ACE Group Fitness", "Precision Nutrition L1"],
    rating: 4.72, reviews: 389, location: "Los Angeles, CA",
    tags: ["Cycling", "Spin", "Cardio", "Music-Driven"], coachingMode: "online", style: "supportive",
    coachingIncludes: ["Live & on-demand cycling classes", "Structured ride programming", "Heart rate zone training", "Community accountability", "Cross-training guidance"],
    successStories: [
      { name: "Maria T.", result: "Lost 45 lbs riding 4x per week for 6 months", quote: "I never thought of cardio as fun until Sierra. Now I protect my ride time like it's sacred." },
      { name: "John B.", result: "Improved cycling FTP by 40% in 12 weeks", quote: "The structured programming is legit. I went from casual spinner to serious cyclist." },
      { name: "Tasha R.", result: "Completed first outdoor century ride after 3 months of training", quote: "Sierra's programming translated perfectly from the bike to the road." },
    ],
    reviewsList: [
      { author: "Kelly M.", rating: 5, text: "Sierra's classes are the only workout I've never wanted to skip. Her music selection alone is worth the subscription." },
      { author: "Peter A.", rating: 4, text: "High energy, great community, solid programming. Some classes sell out fast so book early." },
      { author: "Vanessa T.", rating: 5, text: "I've taken classes from the best studios in NYC. Sierra belongs on that list." },
    ],
    img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&q=80",
  },
  {
    id: 23, name: "Raj Mehta", handle: "@rajgolffitness", specialty: "Golf Performance & Mobility", niche: "performance",
    tagline: "Your body is your biggest swing flaw.",
    bio: "Titleist Performance Institute certified specialist working with amateur golfers to tour-level professionals. I spent 10 years as a club professional before getting obsessed with the physical side of golf performance. Most golfers spend thousands on equipment and lessons but ignore the fact that the limiting factor is their body — their mobility, their rotational power, their stability. I fix that.",
    experience: "10 years", responseTime: "Within 24 hours",
    platforms: { instagram: "52K", youtube: "38K" },
    price: "$$$", priceRange: "$160–$240/mo",
    pricing: [
      { tier: "Handicap Hack", price: "$160/mo", includes: ["Golf fitness assessment", "Custom mobility program", "Rotational power training", "Monthly check-in"] },
      { tier: "Scratch", price: "$200/mo", includes: ["Full periodized golf fitness plan", "Bi-weekly coaching calls", "In-season & off-season programming", "Club-fitting support"] },
      { tier: "Tour Prep", price: "$240/mo", includes: ["Tour-level performance programming", "Weekly sessions", "Mental performance training", "Travel fitness protocols"] },
    ],
    certifications: ["TPI Certified (Level 3)", "NSCA-CSCS", "PGA Class A Professional"],
    rating: 4.87, reviews: 49, location: "Scottsdale, AZ",
    tags: ["Golf Fitness", "Mobility", "Sport-Specific", "Rotational Power"], coachingMode: "both", style: "data-driven",
    coachingIncludes: ["Golf-specific mobility assessment", "Rotational power training", "Stability & balance programs", "In-season maintenance plans", "Off-season rebuilding protocols"],
    successStories: [
      { name: "Bill T.", result: "Dropped handicap from 14 to 7 in one season", quote: "My swing coach told me to work on my hip rotation for years. Raj actually fixed it in 8 weeks." },
      { name: "Sandra G.", result: "Added 22 yards to driver distance at age 58", quote: "I thought distance was gone at my age. Raj showed me it was just mobility." },
      { name: "Mike P.", result: "Played 36 holes without back pain for the first time in 5 years", quote: "The back pain was from my swing compensations. Fix the body, fix the swing." },
    ],
    reviewsList: [
      { author: "Tom W.", rating: 5, text: "Raj is the secret weapon every serious golfer needs. The body-golf connection he teaches is transformative." },
      { author: "Cheryl B.", rating: 5, text: "Comprehensive, science-based, and golf-specific. My pro noticed the difference immediately." },
      { author: "Gary S.", rating: 4, text: "Expensive but legitimate. The assessments alone are more thorough than anything I've had." },
    ],
    img: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&q=80",
  },
  {
    id: 24, name: "Nadia Volkov", handle: "@nadiasurffit", specialty: "Surf & Outdoor Athletic Training", niche: "performance",
    tagline: "Train for the ocean. Perform in life.",
    bio: "Former professional surfer turned outdoor performance coach. After a decade competing on the WSL circuit, I built a training methodology based on what actually keeps athletes performing in dynamic, unpredictable environments — balance, proprioception, rotational power, breath control, and mental focus. My clients are surfers, climbers, paddlers, and anyone who wants functional fitness that translates beyond the gym.",
    experience: "8 years", responseTime: "Within 24 hours",
    platforms: { instagram: "163K", tiktok: "380K" },
    price: "$$", priceRange: "$100–$165/mo",
    pricing: [
      { tier: "Ocean Ready", price: "$100/mo", includes: ["Surf-specific conditioning program", "Balance & stability protocols", "Paddle strength development", "Monthly coaching call"] },
      { tier: "Performance", price: "$135/mo", includes: ["Full outdoor athlete program", "Bi-weekly sessions", "Breath work & mental focus training", "Nutrition for outdoor performance"] },
      { tier: "Elite", price: "$165/mo", includes: ["Custom outdoor performance plan", "Weekly sessions", "Competition prep", "Recovery & longevity programming"] },
    ],
    certifications: ["NASM-CPT", "TRX Suspension Training Certified", "Surf Coaching International Level 2"],
    rating: 4.78, reviews: 171, location: "San Diego, CA",
    tags: ["Surf Fitness", "Outdoor", "Balance", "Upper Body"], coachingMode: "both", style: "holistic",
    coachingIncludes: ["Sport-specific conditioning", "Balance & stability training", "Breathwork protocols", "Rotational power development", "Ocean-environment performance prep"],
    successStories: [
      { name: "Kyle S.", result: "Qualified for professional surfing circuit after 18 months of training", quote: "Nadia understood exactly what my body needed to perform in heavy surf. No other coach came close." },
      { name: "Linda P.", result: "Took up surfing at 45 and caught her first real wave in 3 months", quote: "She built my body for surfing before I ever touched a board. Smart approach." },
      { name: "Jason T.", result: "Returned to climbing after shoulder surgery stronger than pre-injury", quote: "The outdoor performance principles she teaches apply to every discipline I love." },
    ],
    reviewsList: [
      { author: "Brandon K.", rating: 5, text: "Nadia's surf-specific training translates directly to water performance. My paddle strength is unrecognizable." },
      { author: "Sophie M.", rating: 5, text: "She brings a competitive athlete's mindset to everyday training. Inspiring and effective." },
      { author: "Rick A.", rating: 4, text: "Unique niche, genuine expertise, great results. Wish she had more availability." },
    ],
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
  },
  {
    id: 25, name: "Antoine Dubois", handle: "@antoinemacros", specialty: "Body Recomposition & Macros", niche: "nutrition",
    tagline: "Lose fat. Build muscle. At the same time.",
    bio: "CSCS and Precision Nutrition certified coach with a decade of experience helping clients achieve body recomposition — the simultaneous loss of fat and gain of muscle that most people think is impossible. I specialize in the data side of fitness: tracking macros, analyzing body composition trends, and building the most efficient path between where you are and where you want to be.",
    experience: "10 years", responseTime: "Within 6 hours",
    platforms: { instagram: "241K", youtube: "109K", tiktok: "615K" },
    price: "$$", priceRange: "$115–$190/mo",
    pricing: [
      { tier: "Recomp", price: "$115/mo", includes: ["Macro calculation & targets", "Training program for recomp", "Bi-weekly check-ins", "Body composition tracking"] },
      { tier: "Transform", price: "$155/mo", includes: ["Full recomp protocol", "Weekly coaching calls", "Supplement optimization", "Progress photo analysis"] },
      { tier: "Elite", price: "$190/mo", includes: ["Daily coaching access", "Custom periodized training & nutrition", "Dexa scan interpretation", "Advanced body comp strategies"] },
    ],
    certifications: ["NSCA-CSCS", "Precision Nutrition L2", "NASM Physique & Bodybuilding Coach"],
    rating: 4.84, reviews: 422, location: "Dallas, TX",
    tags: ["Body Recomp", "Macros", "Cutting", "Bulking"], coachingMode: "online", style: "data-driven",
    coachingIncludes: ["Macro coaching & tracking", "Recomposition-specific programming", "Body composition analysis", "Supplement protocols", "Periodized nutrition phases"],
    successStories: [
      { name: "Tyler M.", result: "Lost 30 lbs of fat while gaining 12 lbs of muscle over 14 months", quote: "Antoine's approach to recomp is backed by real data. I watched my body change week by week." },
      { name: "Jessica P.", result: "Went from 28% to 19% body fat while increasing strength PRs", quote: "He made tracking macros feel like a superpower, not a chore." },
      { name: "Mark D.", result: "Maintained weight while completely transforming body composition", quote: "The scale barely moved but every single photo told a different story." },
    ],
    reviewsList: [
      { author: "Nina B.", rating: 5, text: "Antoine's analytical approach to nutrition coaching is refreshing. He explains the why behind every decision." },
      { author: "Carlos R.", rating: 5, text: "Three coaches before Antoine, zero real recomp progress. One year with him and the results speak for themselves." },
      { author: "Steph W.", rating: 4, text: "Data-driven and effective. If you like tracking and numbers this is your coach." },
    ],
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
  },
];

const QUIZ_STEPS = [
  { id: "goal", question: "What's your primary fitness goal?", emoji: "🎯", options: ["Lose weight & burn fat", "Build muscle & get stronger", "Improve endurance & cardio", "Flexibility, mobility & recovery", "Athletic performance & sport", "Nutrition & healthy eating habits", "General wellness & stress relief"] },
  { id: "experience", question: "What's your experience level?", emoji: "📊", options: ["Complete beginner", "Some experience (occasional gym-goer)", "Intermediate (consistent 1-2 years)", "Advanced (3+ years, serious training)"] },
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
  return <span style={{ color: C.accent, fontSize: size }}>{"★".repeat(Math.floor(rating))}<span style={{ color: C.borderLight }}>{"★".repeat(5 - Math.floor(rating))}</span></span>;
}

function PlatformBadge({ platform, count }) {
  const p = PLATFORM_ICONS[platform];
  return <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "rgba(255,255,255,0.06)", border: `1px solid ${C.border}`, borderRadius: "20px", padding: "3px 8px", fontSize: "11px", color: C.textSecondary }}><span style={{ color: p.color, fontWeight: 700, fontSize: "10px" }}>{p.label}</span>{count}</span>;
}

function TrainerCard({ trainer, onClick, matchReason }) {
  return (
    <div onClick={() => onClick(trainer)} style={{ background: C.card, border: `1px solid ${matchReason ? C.accentBorder : C.border}`, borderRadius: "16px", overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: matchReason ? `0 0 20px ${C.accentDim}` : "none" }}
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
        {matchReason ? <div style={{ fontSize: "12px", color: C.textSecondary, lineHeight: 1.55, marginBottom: "10px", padding: "8px 10px", background: C.accentDim, borderRadius: "8px", border: `1px solid ${C.accentBorder}` }}>{matchReason}</div>
          : <p style={{ fontSize: "13px", color: C.textMuted, lineHeight: 1.55, marginBottom: "12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{trainer.tagline}</p>}
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "10px" }}>
          {Object.entries(trainer.platforms).map(([p, count]) => <PlatformBadge key={p} platform={p} count={count} />)}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><StarRating rating={trainer.rating} /><span style={{ fontSize: "12px", color: C.textMuted }}>{trainer.rating} ({trainer.reviews})</span></div>
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
      <div style={{ position: "relative", height: "320px", overflow: "hidden", background: C.surface }}>
        <img src={trainer.img} alt={trainer.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #212121 0%, rgba(33,33,33,0.4) 60%, transparent 100%)" }} />
        <button onClick={onBack} style={{ position: "absolute", top: "20px", left: "24px", background: "rgba(0,0,0,0.5)", border: `1px solid ${C.border}`, color: C.textPrimary, borderRadius: "10px", padding: "8px 16px", cursor: "pointer", fontSize: "13px", fontWeight: 600, backdropFilter: "blur(8px)" }}>← Back</button>
      </div>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 60px" }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "28px" }}>
          {[{ label: "Experience", value: trainer.experience }, { label: "Response Time", value: trainer.responseTime }, { label: "Coaching Mode", value: trainer.coachingMode === "both" ? "Online & In-Person" : trainer.coachingMode === "online" ? "Online Only" : "In-Person" }, { label: "Style", value: trainer.style }].map(s => (
            <div key={s.label} style={{ background: C.card, borderRadius: "12px", padding: "14px", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: "10px", color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>{s.label}</div>
              <div style={{ fontSize: "14px", color: C.textPrimary, fontWeight: 600, textTransform: "capitalize" }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "28px", flexWrap: "wrap" }}>
          {Object.entries(trainer.platforms).map(([p, count]) => {
            const icon = PLATFORM_ICONS[p];
            return <div key={p} style={{ background: C.card, borderRadius: "12px", padding: "10px 16px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: icon.color, fontWeight: 800, fontSize: "12px" }}>{icon.label}</span><span style={{ color: C.textPrimary, fontWeight: 700, fontFamily: "'Bebas Neue', cursive", fontSize: "18px", letterSpacing: "1px" }}>{count}</span><span style={{ color: C.textMuted, fontSize: "11px" }}>followers</span></div>;
          })}
        </div>
        <div style={{ display: "flex", gap: "4px", marginBottom: "28px", background: C.surface, borderRadius: "12px", padding: "4px" }}>
          {tabs.map(t => <button key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, background: activeTab === t ? C.accent : "transparent", color: activeTab === t ? "#000" : C.textMuted, transition: "all 0.15s", textTransform: "capitalize" }}>{t === "success" ? "Success Stories" : t.charAt(0).toUpperCase() + t.slice(1)}</button>)}
        </div>
        {activeTab === "about" && (
          <div style={{ display: "grid", gap: "20px" }}>
            <div style={{ background: C.card, borderRadius: "16px", padding: "24px", border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "20px", color: C.textPrimary, letterSpacing: "1px", marginBottom: "12px" }}>About</div>
              <p style={{ fontSize: "15px", color: C.textSecondary, lineHeight: 1.75 }}>{trainer.bio}</p>
            </div>
            <div style={{ background: C.card, borderRadius: "16px", padding: "24px", border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "20px", color: C.textPrimary, letterSpacing: "1px", marginBottom: "16px" }}>Certifications</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {trainer.certifications.map(c => <span key={c} style={{ background: C.accentDim, color: C.accent, border: `1px solid ${C.accentBorder}`, borderRadius: "20px", padding: "6px 14px", fontSize: "13px" }}>{c}</span>)}
              </div>
            </div>
            <div style={{ background: C.card, borderRadius: "16px", padding: "24px", border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "20px", color: C.textPrimary, letterSpacing: "1px", marginBottom: "16px" }}>What's Included</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
                {trainer.coachingIncludes.map(item => <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: C.textSecondary }}><span style={{ color: C.accent, fontSize: "16px", flexShrink: 0 }}>✓</span>{item}</div>)}
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
                <div style={{ fontSize: "28px", fontWeight: 800, color: C.accent, margin: "8px 0 16px" }}>{tier.price}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {tier.includes.map(item => <div key={item} style={{ display: "flex", gap: "8px", fontSize: "13px", color: C.textSecondary, alignItems: "flex-start" }}><span style={{ color: C.accent, flexShrink: 0 }}>✓</span>{item}</div>)}
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
                {[5, 4, 3].map(n => <div key={n} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}><span style={{ fontSize: "12px", color: C.textMuted, width: "12px" }}>{n}</span><span style={{ color: C.accent, fontSize: "12px" }}>★</span><div style={{ flex: 1, height: "6px", background: C.border, borderRadius: "3px", overflow: "hidden" }}><div style={{ height: "100%", background: C.accent, borderRadius: "3px", width: n === 5 ? "78%" : n === 4 ? "18%" : "4%" }} /></div></div>)}
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
        <div style={{ marginTop: "32px", background: C.accentDim, border: `1px solid ${C.accentBorder}`, borderRadius: "16px", padding: "28px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", color: C.textPrimary, letterSpacing: "1px", marginBottom: "8px" }}>Ready to Start?</div>
          <p style={{ fontSize: "14px", color: C.textSecondary, marginBottom: "20px" }}>Reach out to {trainer.name.split(" ")[0]} directly through their social platforms.</p>
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
      const prompt = `You are a fitness coach matchmaker. Match the user to the best 3 trainers and explain why each fits.

USER ANSWERS:
${Object.entries(answers).map(([k, v]) => `- ${k}: ${v.join(", ")}`).join("\n")}

TRAINERS:
${TRAINERS.map(t => `ID:${t.id} | ${t.name} | ${t.specialty} | Price:${t.price} | Mode:${t.coachingMode} | Style:${t.style} | Tags:${t.tags.join(", ")}`).join("\n")}

Return ONLY valid JSON, no markdown:
{"matches":[{"id":1,"reason":"2-sentence personalized explanation"},{"id":2,"reason":"..."},{"id":3,"reason":"..."}]}`;

      const res = await fetch("/api/match", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }) });
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
              return <button key={opt} onClick={() => toggleOption(opt)} style={{ background: isSel ? C.accentDim : C.card, border: `1px solid ${isSel ? C.accent : C.border}`, borderRadius: "12px", padding: "13px 16px", color: isSel ? C.accent : C.textSecondary, cursor: "pointer", textAlign: "left", fontSize: "14px", fontWeight: isSel ? 600 : 400, transition: "all 0.15s", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ width: "18px", height: "18px", border: `2px solid ${isSel ? C.accent : C.borderLight}`, borderRadius: current.multi ? "4px" : "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: isSel ? C.accent : "transparent" }}>{isSel && <span style={{ color: "#000", fontSize: "11px", fontWeight: 900 }}>✓</span>}</span>{opt}
              </button>;
            })}
          </div>
          {error && <p style={{ color: "#ff7070", fontSize: "13px", marginBottom: "14px" }}>{error}</p>}
          <div style={{ display: "flex", gap: "10px" }}>
            {step > 0 && <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, background: C.card, color: C.textSecondary, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "14px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>← Back</button>}
            <button onClick={isLast ? handleFinish : () => setStep(s => s + 1)} disabled={selected.length === 0 || loading} style={{ flex: 2, background: selected.length > 0 && !loading ? C.accent : C.card, color: selected.length > 0 && !loading ? "#000" : C.textMuted, border: "none", borderRadius: "12px", padding: "14px", cursor: selected.length > 0 && !loading ? "pointer" : "default", fontSize: "14px", fontWeight: 800, transition: "all 0.15s" }}>
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
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(33,33,33,0.96)", backdropFilter: "blur(12px)", zIndex: 100, flexWrap: "wrap", gap: "12px" }}>
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
              : filtered.map(t => <TrainerCard key={t.id} trainer={t} onClick={setProfileTrainer} />)}
          </div>
        </>
      )}
      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} onResults={res => { setMatchResults(res); setView("results"); }} />}
    </div>
  );
}