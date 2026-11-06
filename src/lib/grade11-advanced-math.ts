export type BilingualText = { en: string; km: string };
export type Lesson = {
  title: BilingualText;
  goal: BilingualText;
  keyIdea: BilingualText;
  formula: string[];
  example: {
    question: BilingualText;
    steps: BilingualText[];
    answer: BilingualText;
  };
  practice: {
    question: BilingualText;
    answer: BilingualText;
  };
};

export type Chapter = {
  slug: string;
  number: string;
  title: BilingualText;
  hours: number;
  introduction: BilingualText;
  outcomes: BilingualText[];
  syllabus: BilingualText[];
  lessons: Lesson[];
};

export const chapters: Chapter[] = [
  {
    slug: "chapter-01",
    number: "01",
    title: { en: "Sequences and Mathematical Induction", km: "ស្វ៊ីត និងអនុមានរួមគណិតវិទ្យា" },
    hours: 40,
    introduction: {
      en: "A sequence is an ordered list of numbers. In this chapter you will describe patterns, find general terms and finite sums, build recurrence rules, prove statements by induction, and use the binomial theorem.",
      km: "ស្វ៊ីតគឺជាបញ្ជីចំនួនដែលមានលំដាប់។ ក្នុងជំពូកនេះ អ្នកនឹងសិក្សាលំនាំស្វ៊ីត រកតួទី n និងផលបូកមានកំណត់ បង្កើតរូបមន្តតួបន្ទាប់ បញ្ជាក់សមភាពដោយអនុមានគណិតវិទ្យា និងប្រើទ្រឹស្តីបទទ្វេធា។"
    },
    outcomes: [
      { en: "Recognize arithmetic and geometric sequences and find their general terms and finite sums.", km: "ស្គាល់ស្វ៊ីតនព្វន្ត និងស្វ៊ីតធរណីមាត្រ ហើយរកតួទី n និងផលបូកមានកំណត់។" },
      { en: "Use differences, sums and recurrence relations to describe sequences.", km: "ប្រើផលដក ផលបូក និងទំនាក់ទំនងកើតឡើងវិញ ដើម្បីពិពណ៌នាស្វ៊ីត។" },
      { en: "Prove statements by mathematical induction and expand powers with the binomial theorem.", km: "បញ្ជាក់ប្រយោគដោយអនុមានរួមគណិតវិទ្យា និងពន្លាតកម្លាំងដោយទ្រឹស្តីបទទ្វេធា។" }
    ],
    syllabus: [
      { en: "Sequence definition, generation, and increasing/decreasing behaviour", km: "និយមន័យស្វ៊ីត ការបង្កើតស្វ៊ីត និងលក្ខណៈកើន/ថយ" },
      { en: "Arithmetic and geometric sequences; general terms and finite sums", km: "ស្វ៊ីតនព្វន្ត និងធរណីមាត្រ តួទូទៅ និងផលបូកមានកំណត់" },
      { en: "Sigma notation, difference sequences, and finite sums of other sequences", km: "សញ្ញាផលបូក Σ ស្វ៊ីតផលដក និងផលបូកស្វ៊ីតផ្សេងៗ" },
      { en: "Recurrence relations involving two or three terms", km: "ទំនាក់ទំនងកើតឡើងវិញដែលពាក់ព័ន្ធនឹងពីរ ឬបីតួ" },
      { en: "Mathematical induction and the binomial theorem", km: "អនុមានរួមគណិតវិទ្យា និងទ្រឹស្តីបទទ្វេធា" }
    ],
    lessons: [
      {
        title: { en: "1. What is a sequence?", km: "១. តើស្វ៊ីតជាអ្វី?" },
        goal: { en: "Read a sequence, identify its position numbers, and describe its pattern.", km: "អានស្វ៊ីត កំណត់លេខលំដាប់នៃតួ និងពិពណ៌នាលំនាំរបស់វា។" },
        keyIdea: { en: "A sequence is written a₁, a₂, a₃, … . The symbol aₙ means the term in position n. A rule such as aₙ = 2n + 1 gives every term directly.", km: "ស្វ៊ីតសរសេរ a₁, a₂, a₃, … ។ និមិត្តសញ្ញា aₙ មានន័យថាតួដែលស្ថិតនៅលំដាប់ n។ រូបមន្តដូចជា aₙ = 2n + 1 អាចគណនាតួណាមួយដោយផ្ទាល់។" },
        formula: ["a₁, a₂, a₃, …, aₙ", "aₙ = 2n + 1  ⇒  3, 5, 7, 9, …"],
        example: {
          question: { en: "For aₙ = 3n − 2, find the first four terms.", km: "បើ aₙ = 3n − 2 ចូររកបួនតួដំបូង។" },
          steps: [
            { en: "For the first term, substitute n = 1: a₁ = 3(1) − 2 = 1.", km: "សម្រាប់តួទីមួយ ដាក់ n = 1៖ a₁ = 3(1) − 2 = 1។" },
            { en: "Substitute n = 2, 3 and 4: a₂ = 4, a₃ = 7, a₄ = 10.", km: "ដាក់ n = 2, 3 និង 4៖ a₂ = 4, a₃ = 7, a₄ = 10។" }
          ],
          answer: { en: "1, 4, 7, 10", km: "១, ៤, ៧, ១០" }
        },
        practice: { question: { en: "If aₙ = 5n + 2, find a₁, a₂ and a₅.", km: "បើ aₙ = 5n + 2 ចូររក a₁, a₂ និង a₅។" }, answer: { en: "7, 12 and 27", km: "៧, ១២ និង ២៧" } }
      },
      {
        title: { en: "2. Arithmetic sequences", km: "២. ស្វ៊ីតនព្វន្ត" },
        goal: { en: "Recognize a constant difference and calculate a term or finite sum.", km: "ស្គាល់ផលដកថេរ ហើយគណនាតួណាមួយ ឬផលបូកមានកំណត់។" },
        keyIdea: { en: "An arithmetic sequence adds the same number d each time. d is the common difference, and a₁ is the first term.", km: "ស្វ៊ីតនព្វន្តបូកចំនួនដដែល d រាល់ជំហាន។ d ជាផលដករួម ហើយ a₁ ជាតួទីមួយ។" },
        formula: ["d = aₙ₊₁ − aₙ", "aₙ = a₁ + (n − 1)d", "Sₙ = n/2 [2a₁ + (n − 1)d] = n(a₁ + aₙ)/2"],
        example: {
          question: { en: "Find the 10th term and the sum of the first 10 terms of 4, 7, 10, … .", km: "ចូររកតួទី ១០ និងផលបូក ១០ តួដំបូងនៃស្វ៊ីត ៤, ៧, ១០, … ។" },
          steps: [
            { en: "The first term is a₁ = 4 and the common difference is d = 7 − 4 = 3.", km: "តួទីមួយ a₁ = 4 ហើយផលដករួម d = 7 − 4 = 3។" },
            { en: "a₁₀ = 4 + (10 − 1)3 = 31.", km: "a₁₀ = 4 + (10 − 1)3 = 31។" },
            { en: "S₁₀ = 10(4 + 31)/2 = 175.", km: "S₁₀ = 10(4 + 31)/2 = 175។" }
          ],
          answer: { en: "10th term = 31; first-ten-term sum = 175.", km: "តួទី ១០ = 31; ផលបូក ១០ តួដំបូង = 175។" }
        },
        practice: { question: { en: "An arithmetic sequence has a₁ = 6 and d = 4. Find a₈.", km: "ស្វ៊ីតនព្វន្តមួយមាន a₁ = 6 និង d = 4។ ចូររក a₈។" }, answer: { en: "a₈ = 6 + 7(4) = 34", km: "a₈ = 6 + 7(4) = 34" } }
      },
      {
        title: { en: "3. Geometric sequences", km: "៣. ស្វ៊ីតធរណីមាត្រ" },
        goal: { en: "Recognize a constant ratio and calculate terms and finite sums.", km: "ស្គាល់ផលធៀបថេរ ហើយគណនាតួ និងផលបូកមានកំណត់។" },
        keyIdea: { en: "A geometric sequence multiplies by the same non-zero ratio r each time. r is the common ratio; a₁ is the first term.", km: "ស្វ៊ីតធរណីមាត្រគុណនឹងចំនួនថេរ r រាល់ជំហាន។ r ជាផលធៀបរួម ហើយ a₁ ជាតួទីមួយ។" },
        formula: ["r = aₙ₊₁ / aₙ  (when aₙ ≠ 0)", "aₙ = a₁rⁿ⁻¹", "Sₙ = a₁(1 − rⁿ)/(1 − r),  r ≠ 1"],
        example: {
          question: { en: "For 3, 6, 12, … find the 5th term.", km: "សម្រាប់ស្វ៊ីត ៣, ៦, ១២, … ចូររកតួទី ៥។" },
          steps: [
            { en: "a₁ = 3 and r = 6/3 = 2.", km: "a₁ = 3 និង r = 6/3 = 2។" },
            { en: "Use aₙ = a₁rⁿ⁻¹: a₅ = 3 × 2⁴ = 48.", km: "ប្រើ aₙ = a₁rⁿ⁻¹៖ a₅ = 3 × 2⁴ = 48។" }
          ],
          answer: { en: "The 5th term is 48.", km: "តួទី ៥ គឺ 48។" }
        },
        practice: { question: { en: "A geometric sequence has a₁ = 5 and r = 3. Find a₄.", km: "ស្វ៊ីតធរណីមាត្រមួយមាន a₁ = 5 និង r = 3។ ចូររក a₄។" }, answer: { en: "a₄ = 5 × 3³ = 135", km: "a₄ = 5 × 3³ = 135" } }
      },
      {
        title: { en: "4. Sigma notation and difference sequences", km: "៤. សញ្ញាផលបូក និងស្វ៊ីតផលដក" },
        goal: { en: "Read Σ notation and use differences to study a sequence.", km: "អានសញ្ញា Σ និងប្រើផលដកដើម្បីសិក្សាស្វ៊ីត។" },
        keyIdea: { en: "The symbol Σ means add a list of terms. For example, Σ from k = 1 to 4 of k means 1 + 2 + 3 + 4. A first-difference sequence lists aₙ₊₁ − aₙ.", km: "សញ្ញា Σ មានន័យថាបូកតួជាបន្តបន្ទាប់។ ឧទាហរណ៍ Σ ពី k = 1 ដល់ 4 នៃ k មានន័យថា 1 + 2 + 3 + 4។ ស្វ៊ីតផលដកទីមួយគឺបញ្ជី aₙ₊₁ − aₙ។" },
        formula: ["Σₖ₌₁ⁿ aₖ = a₁ + a₂ + … + aₙ", "Δaₙ = aₙ₊₁ − aₙ"],
        example: {
          question: { en: "Evaluate Σ from k = 1 to 5 of (2k).", km: "គណនា Σ ពី k = 1 ដល់ 5 នៃ 2k។" },
          steps: [
            { en: "Write out the terms: 2(1) + 2(2) + 2(3) + 2(4) + 2(5).", km: "សរសេរតួចេញ៖ 2(1) + 2(2) + 2(3) + 2(4) + 2(5)។" },
            { en: "Add: 2 + 4 + 6 + 8 + 10 = 30.", km: "បូក៖ 2 + 4 + 6 + 8 + 10 = 30។" }
          ],
          answer: { en: "30", km: "30" }
        },
        practice: { question: { en: "Find the first differences of 2, 5, 10, 17, 26.", km: "ចូររកផលដកទីមួយនៃ 2, 5, 10, 17, 26។" }, answer: { en: "3, 5, 7, 9", km: "3, 5, 7, 9" } }
      },
      {
        title: { en: "5. Recurrence relations", km: "៥. ទំនាក់ទំនងកើតឡើងវិញ" },
        goal: { en: "Generate terms from earlier terms using a recurrence rule.", km: "បង្កើតតួថ្មីពីតួមុនៗ ដោយប្រើរូបមន្តកើតឡើងវិញ។" },
        keyIdea: { en: "A recurrence relation defines a term using one or more previous terms. It must be accompanied by enough starting values.", km: "ទំនាក់ទំនងកើតឡើងវិញកំណត់តួមួយដោយប្រើតួមុនមួយ ឬច្រើន។ វាត្រូវមានតម្លៃដើមគ្រប់គ្រាន់។" },
        formula: ["Two-term example: a₁ = 2,  aₙ₊₁ = aₙ + 3", "Three-term example: a₁ = 1, a₂ = 1,  aₙ = aₙ₋₁ + aₙ₋₂"],
        example: {
          question: { en: "Given a₁ = 2 and aₙ₊₁ = aₙ + 3, find a₂, a₃ and a₄.", km: "គេឱ្យ a₁ = 2 និង aₙ₊₁ = aₙ + 3។ ចូររក a₂, a₃ និង a₄។" },
          steps: [
            { en: "Add 3 to the first term: a₂ = 2 + 3 = 5.", km: "បូក 3 ទៅតួទីមួយ៖ a₂ = 2 + 3 = 5។" },
            { en: "Continue: a₃ = 5 + 3 = 8, then a₄ = 8 + 3 = 11.", km: "បន្ត៖ a₃ = 5 + 3 = 8 បន្ទាប់មក a₄ = 8 + 3 = 11។" }
          ],
          answer: { en: "2, 5, 8, 11, …", km: "2, 5, 8, 11, …" }
        },
        practice: { question: { en: "Given a₁ = 1, a₂ = 1 and aₙ = aₙ₋₁ + aₙ₋₂, find a₃ through a₆.", km: "គេឱ្យ a₁ = 1, a₂ = 1 និង aₙ = aₙ₋₁ + aₙ₋₂។ ចូររក a₃ ដល់ a₆។" }, answer: { en: "1, 2, 3, 5", km: "1, 2, 3, 5" } }
      },
      {
        title: { en: "6. Mathematical induction", km: "៦. អនុមានរួមគណិតវិទ្យា" },
        goal: { en: "Prove a statement for every positive integer using a base case and an induction step.", km: "បញ្ជាក់ប្រយោគសម្រាប់ចំនួនគត់វិជ្ជមានទាំងអស់ ដោយប្រើករណីដំបូង និងជំហានអនុមាន។" },
        keyIdea: { en: "First prove the statement for n = 1. Then assume it is true for n = k and use that assumption to prove it for n = k + 1.", km: "ដំបូងបញ្ជាក់ប្រយោគនៅ n = 1។ បន្ទាប់មកសន្មតថាវាពិតសម្រាប់ n = k ហើយប្រើសន្មតនោះដើម្បីបញ្ជាក់ n = k + 1។" },
        formula: ["1 + 2 + … + n = n(n + 1)/2"],
        example: {
          question: { en: "Show the induction structure for 1 + 2 + … + n = n(n + 1)/2.", km: "បង្ហាញរចនាសម្ព័ន្ធអនុមានសម្រាប់ 1 + 2 + … + n = n(n + 1)/2។" },
          steps: [
            { en: "Base case: n = 1. Left side = 1 and right side = 1(2)/2 = 1.", km: "ករណីដំបូង៖ n = 1។ ខាងឆ្វេង = 1 និងខាងស្តាំ = 1(2)/2 = 1។" },
            { en: "Induction hypothesis: assume 1 + … + k = k(k + 1)/2.", km: "សន្មតអនុមាន៖ សន្មតថា 1 + … + k = k(k + 1)/2។" },
            { en: "For k + 1, add k + 1: k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2. This is the required formula with n = k + 1.", km: "សម្រាប់ k + 1 បូក k + 1 បន្ថែម៖ k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2។ នេះគឺជារូបមន្តដែលត្រូវការសម្រាប់ n = k + 1។" }
          ],
          answer: { en: "The base case and induction step both hold, so the statement is true for every positive integer n.", km: "ករណីដំបូង និងជំហានអនុមានសុទ្ធតែត្រឹមត្រូវ ដូច្នេះប្រយោគនេះពិតសម្រាប់ចំនួនគត់វិជ្ជមាន n ទាំងអស់។" }
        },
        practice: { question: { en: "State the two main steps used in a proof by induction.", km: "ចូររៀបរាប់ជំហានសំខាន់ពីរនៃការបញ្ជាក់ដោយអនុមាន។" }, answer: { en: "1) Prove the base case. 2) Assume true for k and prove true for k + 1.", km: "១) បញ្ជាក់ករណីដំបូង។ ២) សន្មតថាពិតសម្រាប់ k ហើយបញ្ជាក់ថាពិតសម្រាប់ k + 1។" } }
      },
      {
        title: { en: "7. Binomial theorem and Pascal's triangle", km: "៧. ទ្រឹស្តីបទទ្វេធា និងត្រីកោណប៉ាស្កាល់" },
        goal: { en: "Expand (a + b)ⁿ using binomial coefficients.", km: "ពន្លាត (a + b)ⁿ ដោយប្រើមេគុណទ្វេធា។" },
        keyIdea: { en: "The coefficients in a binomial expansion are given by combinations or Pascal's triangle. The exponents of a decrease while the exponents of b increase.", km: "មេគុណក្នុងការពន្លាតទ្វេធា បានមកពីបន្សំ ឬត្រីកោណប៉ាស្កាល់។ និទស្សន្តរបស់ a ថយចុះ ខណៈនិទស្សន្តរបស់ b កើនឡើង។" },
        formula: ["(a + b)ⁿ = Σₖ₌₀ⁿ C(n,k)aⁿ⁻ᵏbᵏ", "C(n,k) = n! / [k!(n − k)!]"],
        example: {
          question: { en: "Expand (x + 2)³.", km: "ចូរពន្លាត (x + 2)³។" },
          steps: [
            { en: "Use the coefficients 1, 3, 3, 1 for power 3.", km: "ប្រើមេគុណ 1, 3, 3, 1 សម្រាប់កម្លាំងទី 3។" },
            { en: "Write x³ + 3x²(2) + 3x(2²) + 2³.", km: "សរសេរ x³ + 3x²(2) + 3x(2²) + 2³។" },
            { en: "Simplify each term: x³ + 6x² + 12x + 8.", km: "សម្រួលតួ៖ x³ + 6x² + 12x + 8។" }
          ],
          answer: { en: "x³ + 6x² + 12x + 8", km: "x³ + 6x² + 12x + 8" }
        },
        practice: { question: { en: "Find the coefficient of x² in (x + 1)⁴.", km: "ចូររកមេគុណរបស់ x² ក្នុង (x + 1)⁴។" }, answer: { en: "6", km: "6" } }
      }
    ]
  },
  {
    slug: "chapter-02", number: "02",
    title: { en: "Exponential and Logarithmic Functions", km: "អនុគមន៍អិចស្ប៉ូណង់ស្យែល និងអនុគមន៍លោការីត" }, hours: 32,
    introduction: { en: "This chapter connects powers, roots, exponential growth and logarithms. You will learn how to transform expressions, sketch graphs and solve equations and inequalities.", km: "ជំពូកនេះភ្ជាប់កម្លាំង ឫស កំណើនអិចស្ប៉ូណង់ស្យែល និងលោការីត។ អ្នកនឹងរៀនបម្លែងកន្សោម គូសក្រាប និងដោះស្រាយសមីការ និងវិសមីការ។" },
    outcomes: [
      { en: "Use nth roots and fractional exponents correctly.", km: "ប្រើឫសទី n និងនិទស្សន្តប្រភាគបានត្រឹមត្រូវ។" },
      { en: "Define exponential and logarithmic functions, sketch their graphs, and solve related equations and inequalities.", km: "កំណត់អនុគមន៍អិចស្ប៉ូណង់ស្យែល និងលោការីត គូសក្រាប និងដោះស្រាយសមីការ/វិសមីការពាក់ព័ន្ធ។" },
      { en: "Apply these functions to real situations such as growth and decay.", km: "អនុវត្តអនុគមន៍ទាំងនេះក្នុងបញ្ហាជាក់ស្តែង ដូចជាកំណើន និងការថយចុះ។" }
    ],
    syllabus: [
      { en: "Nth roots, rational exponents and exponent laws", km: "ឫសទី n និទស្សន្តប្រភាគ និងច្បាប់និទស្សន្ត" },
      { en: "Exponential functions, graphs, equations and inequalities", km: "អនុគមន៍អិចស្ប៉ូណង់ស្យែល ក្រាប សមីការ និងវិសមីការ" },
      { en: "Logarithm properties, logarithmic functions and common logarithms", km: "លក្ខណៈលោការីត អនុគមន៍លោការីត និងលោការីតគោល ១០" },
      { en: "Applications and enrichment problems", km: "ការអនុវត្ត និងលំហាត់ពង្រឹង" }
    ],
    lessons: [
      {
        title: { en: "1. Roots and fractional exponents", km: "១. ឫស និងនិទស្សន្តប្រភាគ" },
        goal: { en: "Rewrite roots as powers and powers as roots.", km: "បម្លែងឫសទៅជាកម្លាំង និងកម្លាំងទៅជាឫស។" },
        keyIdea: { en: "For a positive number a, a^(1/n) is the nth root of a. More generally, a^(m/n) = (ⁿ√a)ᵐ for real-valued cases where the expression is defined.", km: "សម្រាប់ a វិជ្ជមាន a^(1/n) គឺជាឫសទី n នៃ a។ ជាទូទៅ a^(m/n) = (ⁿ√a)ᵐ ក្នុងករណីដែលកន្សោមមានតម្លៃពិត។" },
        formula: ["a^(1/n) = ⁿ√a", "a^(m/n) = ⁿ√(aᵐ) = (ⁿ√a)ᵐ"],
        example: { question: { en: "Evaluate 27^(2/3).", km: "ចូរគណនា 27^(2/3)។" }, steps: [
          { en: "The denominator 3 means take the cube root: ³√27 = 3.", km: "ភាគបែង 3 មានន័យថាយកឫសគូប៖ ³√27 = 3។" },
          { en: "Square the result: 3² = 9.", km: "យកលទ្ធផលទៅការ៉េ៖ 3² = 9។" }
        ], answer: { en: "9", km: "9" } },
        practice: { question: { en: "Evaluate 16^(3/4).", km: "ចូរគណនា 16^(3/4)។" }, answer: { en: "(⁴√16)³ = 2³ = 8", km: "(⁴√16)³ = 2³ = 8" } }
      },
      {
        title: { en: "2. Laws of exponents", km: "២. ច្បាប់និទស្សន្ត" },
        goal: { en: "Simplify products, quotients and powers.", km: "សម្រួលផលគុណ ផលចែក និងកម្លាំង។" },
        keyIdea: { en: "When the base is the same, multiplication adds exponents and division subtracts exponents. A power raised to a power multiplies the exponents.", km: "ពេលមានគោលដូចគ្នា ការគុណត្រូវបូកនិទស្សន្ត ហើយការចែកត្រូវដកនិទស្សន្ត។ កម្លាំងលើកទៅកម្លាំង គឺគុណនិទស្សន្ត។" },
        formula: ["aᵐ × aⁿ = aᵐ⁺ⁿ", "aᵐ / aⁿ = aᵐ⁻ⁿ  (a ≠ 0)", "(aᵐ)ⁿ = aᵐⁿ", "a⁰ = 1  (a ≠ 0)"],
        example: { question: { en: "Simplify (x³ × x⁵) / x² for x ≠ 0.", km: "សម្រួល (x³ × x⁵) / x² សម្រាប់ x ≠ 0។" }, steps: [
          { en: "Multiply same bases: x³ × x⁵ = x⁸.", km: "គុណគោលដូចគ្នា៖ x³ × x⁵ = x⁸។" },
          { en: "Divide same bases: x⁸ / x² = x⁶.", km: "ចែកគោលដូចគ្នា៖ x⁸ / x² = x⁶។" }
        ], answer: { en: "x⁶", km: "x⁶" } },
        practice: { question: { en: "Simplify (a⁷ × a²) / a⁴, where a ≠ 0.", km: "សម្រួល (a⁷ × a²) / a⁴ ដោយ a ≠ 0។" }, answer: { en: "a⁵", km: "a⁵" } }
      },
      {
        title: { en: "3. Exponential functions and graphs", km: "៣. អនុគមន៍ និងក្រាបអិចស្ប៉ូណង់ស្យែល" },
        goal: { en: "Recognize growth and decay and identify the basic graph features.", km: "ស្គាល់កំណើន និងការថយចុះ ហើយកំណត់លក្ខណៈសំខាន់ៗនៃក្រាប។" },
        keyIdea: { en: "An exponential function has the form f(x) = aˣ with a > 0 and a ≠ 1. If a > 1 it increases; if 0 < a < 1 it decreases. Its domain is all real numbers, range is positive real numbers, and y = 0 is a horizontal asymptote.", km: "អនុគមន៍អិចស្ប៉ូណង់ស្យែលមានទម្រង់ f(x) = aˣ ដែល a > 0 និង a ≠ 1។ បើ a > 1 ក្រាបកើន បើ 0 < a < 1 ក្រាបថយ។ ដែនកំណត់ជាចំនួនពិតទាំងអស់ ជួរតម្លៃជាចំនួនវិជ្ជមាន ហើយ y = 0 ជាអាស៊ីមតូតផ្ដេក។" },
        formula: ["f(x) = aˣ,  a > 0, a ≠ 1", "a > 1: growth;   0 < a < 1: decay", "aˣ = aʸ  ⇒  x = y"],
        example: { question: { en: "Solve 2^(x + 1) = 16.", km: "ដោះស្រាយ 2^(x + 1) = 16។" }, steps: [
          { en: "Write 16 as a power of 2: 16 = 2⁴.", km: "សរសេរ 16 ជាកម្លាំងគោល 2៖ 16 = 2⁴។" },
          { en: "The bases match, so x + 1 = 4.", km: "គោលទាំងពីរដូចគ្នា ដូច្នេះ x + 1 = 4។" },
          { en: "Subtract 1: x = 3.", km: "ដក 1៖ x = 3។" }
        ], answer: { en: "x = 3", km: "x = 3" } },
        practice: { question: { en: "Solve 3ˣ = 81.", km: "ដោះស្រាយ 3ˣ = 81។" }, answer: { en: "81 = 3⁴, so x = 4.", km: "81 = 3⁴ ដូច្នេះ x = 4។" } }
      },
      {
        title: { en: "4. Logarithms and applications", km: "៤. លោការីត និងការអនុវត្ត" },
        goal: { en: "Use logarithms as inverse operations to exponents.", km: "ប្រើលោការីតជាប្រតិបត្តិការបញ្ច្រាសនៃការលើកកម្លាំង។" },
        keyIdea: { en: "logₐ(x) = y means aʸ = x. The argument x must be positive, and the base a must be positive and not equal to 1.", km: "logₐ(x) = y មានន័យថា aʸ = x។ អាគុយម៉ង់ x ត្រូវតែវិជ្ជមាន ហើយគោល a ត្រូវវិជ្ជមាន និងមិនស្មើ 1។" },
        formula: ["logₐ(xy) = logₐx + logₐy", "logₐ(x/y) = logₐx − logₐy", "logₐ(xᵏ) = k logₐx", "logₐx = log_bx / log_ba"],
        example: { question: { en: "Solve log₂(x − 1) = 3.", km: "ដោះស្រាយ log₂(x − 1) = 3។" }, steps: [
          { en: "Convert to exponential form: x − 1 = 2³.", km: "បម្លែងទៅទម្រង់អិចស្ប៉ូណង់ស្យែល៖ x − 1 = 2³។" },
          { en: "Calculate 2³ = 8, so x − 1 = 8.", km: "គណនា 2³ = 8 ដូច្នេះ x − 1 = 8។" },
          { en: "Solve x = 9 and check x − 1 > 0.", km: "ដោះស្រាយបាន x = 9 ហើយពិនិត្យ x − 1 > 0។" }
        ], answer: { en: "x = 9", km: "x = 9" } },
        practice: { question: { en: "Evaluate log₁₀(1000).", km: "ចូរគណនា log₁₀(1000)។" }, answer: { en: "3, because 10³ = 1000.", km: "3 ព្រោះ 10³ = 1000។" } }
      }
    ]
  },
  {
    slug: "chapter-03", number: "03",
    title: { en: "Trigonometric Functions", km: "អនុគមន៍ត្រីកោណមាត្រ" }, hours: 40,
    introduction: { en: "Trigonometry describes angles, rotations and repeating patterns. This unit uses radians, trigonometric functions, their graphs and identities to solve equations and inequalities.", km: "ត្រីកោណមាត្រពិពណ៌នាមុំ ការបង្វិល និងលំនាំដែលកើតឡើងដដែលៗ។ ជំពូកនេះប្រើរ៉ាដ្យង់ អនុគមន៍ត្រីកោណមាត្រ ក្រាប និងអត្តសញ្ញាណ ដើម្បីដោះស្រាយសមីការ និងវិសមីការ។" },
    outcomes: [
      { en: "Work with general angles and radians.", km: "គណនាមុំទូទៅ និងមុំជារ៉ាដ្យង់។" },
      { en: "Use trigonometric properties, associated angles and addition/double-angle identities.", km: "ប្រើលក្ខណៈត្រីកោណមាត្រ មុំជាប់ទាក់ទង និងរូបមន្តបូក/មុំទ្វេ។" },
      { en: "Sketch trigonometric graphs and solve equations and inequalities.", km: "គូសក្រាបត្រីកោណមាត្រ និងដោះស្រាយសមីការ/វិសមីការ។" }
    ],
    syllabus: [
      { en: "General angles and radian measure", km: "មុំទូទៅ និងរង្វាស់រ៉ាដ្យង់" },
      { en: "Sine, cosine, tangent, cotangent and their graphs", km: "ស៊ីនុស កូស៊ីនុស តង់សង់ កូតង់សង់ និងក្រាប" },
      { en: "Periodicity, associated angles and addition/double-angle formulae", km: "ខួប មុំជាប់ទាក់ទង និងរូបមន្តបូក/មុំទ្វេ" },
      { en: "Trigonometric equations and inequalities", km: "សមីការ និងវិសមីការត្រីកោណមាត្រ" }
    ],
    lessons: [
      {
        title: { en: "1. Angles and radians", km: "១. មុំ និងរ៉ាដ្យង់" },
        goal: { en: "Convert between degrees and radians.", km: "បម្លែងរវាងដឺក្រេ និងរ៉ាដ្យង់។" },
        keyIdea: { en: "One full turn is 360° or 2π radians. Radian measure is the arc length divided by the radius.", km: "មួយជុំគឺ 360° ឬ 2π រ៉ាដ្យង់។ រង្វាស់រ៉ាដ្យង់ស្មើប្រវែងធ្នូចែកនឹងកាំ។" },
        formula: ["180° = π radians", "radians = degrees × π/180", "degrees = radians × 180/π"],
        example: { question: { en: "Convert 150° to radians.", km: "បម្លែង 150° ទៅជារ៉ាដ្យង់។" }, steps: [
          { en: "Multiply by π/180: 150 × π/180.", km: "គុណនឹង π/180៖ 150 × π/180។" },
          { en: "Simplify 150/180 to 5/6.", km: "សម្រួល 150/180 ទៅជា 5/6។" }
        ], answer: { en: "5π/6 radians", km: "5π/6 រ៉ាដ្យង់" } },
        practice: { question: { en: "Convert π/3 radians to degrees.", km: "បម្លែង π/3 រ៉ាដ្យង់ ទៅជាដឺក្រេ។" }, answer: { en: "60°", km: "60°" } }
      },
      {
        title: { en: "2. Trigonometric functions and graphs", km: "២. អនុគមន៍ និងក្រាបត្រីកោណមាត្រ" },
        goal: { en: "Use the unit circle and understand periodic graphs.", km: "ប្រើរង្វង់ឯកតា និងយល់ពីក្រាបដែលមានខួប។" },
        keyIdea: { en: "On the unit circle, a point at angle θ has coordinates (cos θ, sin θ). Sine and cosine repeat every 2π; tangent repeats every π.", km: "លើរង្វង់ឯកតា ចំណុចនៅមុំ θ មានកូអរដោនេ (cos θ, sin θ)។ ស៊ីនុស និងកូស៊ីនុសកើតឡើងវិញរាល់ 2π ខណៈតង់សង់រាល់ π។" },
        formula: ["sin²θ + cos²θ = 1", "tan θ = sin θ / cos θ", "sin(θ + 2π) = sin θ", "cos(θ + 2π) = cos θ"],
        example: { question: { en: "If sin θ = 3/5 and θ is in quadrant I, find cos θ.", km: "បើ sin θ = 3/5 ហើយ θ ស្ថិតក្នុងចតុភាគ I ចូររក cos θ។" }, steps: [
          { en: "Use sin²θ + cos²θ = 1.", km: "ប្រើ sin²θ + cos²θ = 1។" },
          { en: "cos²θ = 1 − 9/25 = 16/25.", km: "cos²θ = 1 − 9/25 = 16/25។" },
          { en: "In quadrant I cosine is positive, so cos θ = 4/5.", km: "ក្នុងចតុភាគ I កូស៊ីនុសវិជ្ជមាន ដូច្នេះ cos θ = 4/5។" }
        ], answer: { en: "4/5", km: "4/5" } },
        practice: { question: { en: "State the period of y = tan x.", km: "ចូរបញ្ជាក់ខួបនៃ y = tan x។" }, answer: { en: "π", km: "π" } }
      },
      {
        title: { en: "3. Addition and double-angle identities", km: "៣. អត្តសញ្ញាណមុំបូក និងមុំទ្វេ" },
        goal: { en: "Apply identities to find exact values and simplify expressions.", km: "អនុវត្តអត្តសញ្ញាណដើម្បីរកតម្លៃពិត និងសម្រួលកន្សោម។" },
        keyIdea: { en: "Addition identities express a trigonometric function of a sum or difference in terms of functions of the two angles.", km: "អត្តសញ្ញាណមុំបូកបង្ហាញអនុគមន៍ត្រីកោណមាត្រនៃផលបូក ឬផលដកជាអនុគមន៍នៃមុំពីរ។" },
        formula: ["sin(A ± B) = sin A cos B ± cos A sin B", "cos(A ± B) = cos A cos B ∓ sin A sin B", "sin 2A = 2 sin A cos A", "cos 2A = cos²A − sin²A"],
        example: { question: { en: "Find sin 75° using an addition identity.", km: "ចូររក sin 75° ដោយប្រើអត្តសញ្ញាណមុំបូក។" }, steps: [
          { en: "Write 75° = 45° + 30°.", km: "សរសេរ 75° = 45° + 30°។" },
          { en: "sin 75° = sin45°cos30° + cos45°sin30°.", km: "sin 75° = sin45°cos30° + cos45°sin30°។" },
          { en: "Substitute exact values and simplify: (√6 + √2)/4.", km: "ដាក់តម្លៃពិត ហើយសម្រួល៖ (√6 + √2)/4។" }
        ], answer: { en: "(√6 + √2)/4", km: "(√6 + √2)/4" } },
        practice: { question: { en: "Write cos 2A in terms of sin A.", km: "សរសេរ cos 2A ជាទម្រង់ sin A។" }, answer: { en: "cos 2A = 1 − 2sin²A", km: "cos 2A = 1 − 2sin²A" } }
      },
      {
        title: { en: "4. Trigonometric equations and inequalities", km: "៤. សមីការ និងវិសមីការត្រីកោណមាត្រ" },
        goal: { en: "Find all angles satisfying an equation in a stated interval.", km: "រកមុំទាំងអស់ដែលបំពេញសមីការ ក្នុងចន្លោះដែលបានកំណត់។" },
        keyIdea: { en: "Use the unit circle, periodicity and reference angles. Always check the requested interval and include every solution in it.", km: "ប្រើរង្វង់ឯកតា ខួប និងមុំយោង។ ត្រូវពិនិត្យចន្លោះដែលបានកំណត់ ហើយដាក់ចម្លើយទាំងអស់ក្នុងចន្លោះនោះ។" },
        formula: ["sin x = 0  ⇒  x = kπ", "cos x = 0  ⇒  x = π/2 + kπ", "tan x = 0  ⇒  x = kπ,  k ∈ ℤ"],
        example: { question: { en: "Solve sin x = 1/2 for 0 ≤ x < 2π.", km: "ដោះស្រាយ sin x = 1/2 សម្រាប់ 0 ≤ x < 2π។" }, steps: [
          { en: "The reference angle is π/6 because sin(π/6) = 1/2.", km: "មុំយោងគឺ π/6 ព្រោះ sin(π/6) = 1/2។" },
          { en: "Sine is positive in quadrants I and II.", km: "ស៊ីនុសវិជ្ជមានក្នុងចតុភាគ I និង II។" },
          { en: "The solutions are π/6 and π − π/6 = 5π/6.", km: "ចម្លើយគឺ π/6 និង π − π/6 = 5π/6។" }
        ], answer: { en: "x = π/6 or x = 5π/6", km: "x = π/6 ឬ x = 5π/6" } },
        practice: { question: { en: "Solve cos x = 0 for 0 ≤ x < 2π.", km: "ដោះស្រាយ cos x = 0 សម្រាប់ 0 ≤ x < 2π។" }, answer: { en: "x = π/2 or x = 3π/2", km: "x = π/2 ឬ x = 3π/2" } }
      }
    ]
  },
  {
    slug: "chapter-04", number: "04",
    title: { en: "Matrices", km: "ម៉ាទ្រីស" }, hours: 32,
    introduction: { en: "Matrices organize numbers into rows and columns. They provide efficient methods for calculations, solving simultaneous equations and representing geometric transformations.", km: "ម៉ាទ្រីសរៀបចំចំនួនជាជួរដេក និងជួរឈរ។ វាផ្តល់វិធីមានប្រសិទ្ធភាពសម្រាប់គណនា ដោះស្រាយប្រព័ន្ធសមីការ និងតំណាងបម្លែងធរណីមាត្រ។" },
    outcomes: [
      { en: "Perform matrix operations and calculate determinants and inverses of 2×2 and 3×3 matrices.", km: "អនុវត្តប្រមាណវិធីម៉ាទ្រីស និងគណនាដេទែរមីណង់/ម៉ាទ្រីសច្រាស ទំហំ 2×2 និង 3×3។" },
      { en: "Solve simultaneous linear equations and describe linear transformations.", km: "ដោះស្រាយប្រព័ន្ធសមីការលីនេអ៊ែរ និងពិពណ៌នាបម្លែងលីនេអ៊ែរ។" }
    ],
    syllabus: [
      { en: "Matrix concepts, equality, addition, scalar multiplication and products", km: "គោលគំនិតម៉ាទ្រីស សមភាព បូក គុណស្កាលែរ និងផលគុណម៉ាទ្រីស" },
      { en: "Determinants and inverse matrices of order 2 and 3", km: "ដេទែរមីណង់ និងម៉ាទ្រីសច្រាសលំដាប់ 2 និង 3" },
      { en: "Systems of two or three linear equations", km: "ប្រព័ន្ធសមីការលីនេអ៊ែរពីរ ឬបីអថេរ" },
      { en: "Reflections, rotations, enlargements and composite transformations", km: "ការឆ្លុះ ការបង្វិល ការពង្រីក និងបម្លែងផ្សំ" }
    ],
    lessons: [
      {
        title: { en: "1. Matrix notation and operations", km: "១. និមិត្តសញ្ញា និងប្រមាណវិធីម៉ាទ្រីស" },
        goal: { en: "Read matrix order and perform addition and scalar multiplication.", km: "អានលំដាប់ម៉ាទ្រីស និងអនុវត្តការបូក/គុណស្កាលែរ។" },
        keyIdea: { en: "A matrix with m rows and n columns has order m × n. Matrices can be added only when their orders match.", km: "ម៉ាទ្រីសមាន m ជួរដេក និង n ជួរឈរ មានលំដាប់ m × n។ ម៉ាទ្រីសអាចបូកគ្នាបាន លុះត្រាតែមានលំដាប់ដូចគ្នា។" },
        formula: ["A + B = [aᵢⱼ + bᵢⱼ]", "kA = [kaᵢⱼ]", "(m × n)(n × p) → m × p"],
        example: { question: { en: "Add A = [[1, 2], [3, 4]] and B = [[2, 0], [1, 5]].", km: "បូក A = [[1, 2], [3, 4]] និង B = [[2, 0], [1, 5]]។" }, steps: [
          { en: "Add entries in matching positions: 1+2, 2+0, 3+1, 4+5.", km: "បូកធាតុនៅទីតាំងដូចគ្នា៖ 1+2, 2+0, 3+1, 4+5។" },
          { en: "Place the four results in the same 2×2 positions.", km: "ដាក់លទ្ធផលទាំងបួននៅទីតាំងដដែលក្នុងម៉ាទ្រីស 2×2។" }
        ], answer: { en: "A + B = [[3, 2], [4, 9]]", km: "A + B = [[3, 2], [4, 9]]" } },
        practice: { question: { en: "Find 2[[1, −1], [0, 3]].", km: "ចូរគណនា 2[[1, −1], [0, 3]]។" }, answer: { en: "[[2, −2], [0, 6]]", km: "[[2, −2], [0, 6]]" } }
      },
      {
        title: { en: "2. Determinants and inverse matrices", km: "២. ដេទែរមីណង់ និងម៉ាទ្រីសច្រាស" },
        goal: { en: "Find a 2×2 determinant and inverse when the determinant is non-zero.", km: "រកដេទែរមីណង់ និងម៉ាទ្រីសច្រាសទំហំ 2×2 នៅពេលដេទែរមីណង់មិនសូន្យ។" },
        keyIdea: { en: "The determinant tells whether a square matrix is invertible. If det(A) = 0, its inverse does not exist.", km: "ដេទែរមីណង់បញ្ជាក់ថាម៉ាទ្រីសការ៉េមានច្រាសឬអត់។ បើ det(A) = 0 នោះម៉ាទ្រីសច្រាសមិនមានទេ។" },
        formula: ["A = [[a, b], [c, d]]", "det(A) = ad − bc", "A⁻¹ = 1/(ad − bc) [[d, −b], [−c, a]]", "For a 3×3 matrix: det(A) = a(ei − fh) − b(di − fg) + c(dh − eg)", "For any square matrix: A⁻¹ = adj(A)/det(A), when det(A) ≠ 0"],
        example: { question: { en: "Find the determinant of [[2, 1], [3, 4]].", km: "ចូររកដេទែរមីណង់នៃ [[2, 1], [3, 4]]។" }, steps: [
          { en: "Use ad − bc: (2)(4) − (1)(3).", km: "ប្រើ ad − bc៖ (2)(4) − (1)(3)។" },
          { en: "Calculate 8 − 3 = 5.", km: "គណនា 8 − 3 = 5។" }
        ], answer: { en: "det(A) = 5, so the matrix is invertible.", km: "det(A) = 5 ដូច្នេះម៉ាទ្រីសមានច្រាស។" } },
        practice: { question: { en: "Find det([[1, 2], [3, 6]]).", km: "ចូររក det([[1, 2], [3, 6]])។" }, answer: { en: "1×6 − 2×3 = 0; no inverse exists.", km: "1×6 − 2×3 = 0; ដូច្នេះគ្មានម៉ាទ្រីសច្រាសទេ។" } }
      },
      {
        title: { en: "3. Simultaneous linear equations", km: "៣. ប្រព័ន្ធសមីការលីនេអ៊ែរ" },
        goal: { en: "Represent a system as AX = B and solve it.", km: "តំណាងប្រព័ន្ធសមីការជា AX = B ហើយដោះស្រាយវា។" },
        keyIdea: { en: "A system of linear equations can be written as a matrix equation. If A is invertible, X = A⁻¹B.", km: "ប្រព័ន្ធសមីការលីនេអ៊ែរអាចសរសេរជាសមីការម៉ាទ្រីស។ បើ A មានម៉ាទ្រីសច្រាស នោះ X = A⁻¹B។" },
        formula: ["AX = B", "If det(A) ≠ 0:  X = A⁻¹B"],
        example: { question: { en: "Solve x + y = 5 and x − y = 1.", km: "ដោះស្រាយ x + y = 5 និង x − y = 1។" }, steps: [
          { en: "Add the equations: 2x = 6, so x = 3.", km: "បូកសមីការទាំងពីរ៖ 2x = 6 ដូច្នេះ x = 3។" },
          { en: "Substitute into x + y = 5: 3 + y = 5, so y = 2.", km: "ជំនួសក្នុង x + y = 5៖ 3 + y = 5 ដូច្នេះ y = 2។" }
        ], answer: { en: "(x, y) = (3, 2)", km: "(x, y) = (3, 2)" } },
        practice: { question: { en: "Solve 2x + y = 7 and x − y = 2.", km: "ដោះស្រាយ 2x + y = 7 និង x − y = 2។" }, answer: { en: "x = 3, y = 1", km: "x = 3, y = 1" } }
      },
      {
        title: { en: "4. Linear transformations", km: "៤. បម្លែងលីនេអ៊ែរ" },
        goal: { en: "Use matrices to represent reflections, rotations and enlargements.", km: "ប្រើម៉ាទ្រីសដើម្បីតំណាងការឆ្លុះ ការបង្វិល និងការពង្រីក។" },
        keyIdea: { en: "A transformation matrix acts on a coordinate column vector. The order of matrix multiplication matters when transformations are composed.", km: "ម៉ាទ្រីសបម្លែងធ្វើប្រតិបត្តិការលើវ៉ិចទ័រកូអរដោនេជាជួរឈរ។ លំដាប់គុណម៉ាទ្រីសសំខាន់នៅពេលផ្សំបម្លែង។" },
        formula: ["Rotation by θ: [[cosθ, −sinθ], [sinθ, cosθ]]", "Enlargement by scale k: [[k, 0], [0, k]]", "Reflection in x-axis: [[1, 0], [0, −1]]"],
        example: { question: { en: "Reflect point (2, 3) in the x-axis.", km: "ឆ្លុះចំណុច (2, 3) តាមអ័ក្ស x។" }, steps: [
          { en: "Use the matrix [[1, 0], [0, −1]].", km: "ប្រើម៉ាទ្រីស [[1, 0], [0, −1]]។" },
          { en: "Multiply it by the column [[2], [3]] to get [[2], [−3]].", km: "គុណនឹងជួរឈរ [[2], [3]] ដើម្បីបាន [[2], [−3]]។" }
        ], answer: { en: "The image is (2, −3).", km: "រូបភាពថ្មីគឺ (2, −3)។" } },
        practice: { question: { en: "Enlarge point (−1, 2) by scale factor 3 about the origin.", km: "ពង្រីកចំណុច (−1, 2) ដោយមាត្រដ្ឋាន 3 ជុំវិញគល់កូអរដោនេ។" }, answer: { en: "(−3, 6)", km: "(−3, 6)" } }
      }
    ]
  },
  {
    slug: "chapter-05", number: "05",
    title: { en: "Complex Plane", km: "ប្លង់ចំនួនកុំផ្លិច" }, hours: 38,
    introduction: { en: "Complex numbers extend the real number system using i² = −1. The complex plane lets you see them as points and use polar form to study multiplication, powers and roots.", km: "ចំនួនកុំផ្លិចពង្រីកប្រព័ន្ធចំនួនពិតដោយប្រើ i² = −1។ ប្លង់ចំនួនកុំផ្លិចអនុញ្ញាតឱ្យមើលវាជាចំណុច ហើយប្រើទម្រង់ប៉ូលែសិក្សាផលគុណ កម្លាំង និងឫស។" },
    outcomes: [
      { en: "Plot complex numbers and express them in polar form.", km: "គូសចំនួនកុំផ្លិចលើប្លង់ និងសរសេរជាទម្រង់ប៉ូលែ។" },
      { en: "Use De Moivre's theorem and solve geometric problems on the complex plane.", km: "ប្រើទ្រឹស្តីបទដឺម័វ្រ និងដោះស្រាយបញ្ហាធរណីមាត្រលើប្លង់ចំនួនកុំផ្លិច។" }
    ],
    syllabus: [
      { en: "Argand diagram, modulus, argument and polar form", km: "ប្លង់អាហ្គង់ ម៉ូឌុល អាគុយម៉ង់ និងទម្រង់ប៉ូលែ" },
      { en: "Operations and geometric meaning of complex numbers", km: "ប្រមាណវិធី និងន័យធរណីមាត្រនៃចំនួនកុំផ្លិច" },
      { en: "De Moivre's theorem, powers and roots", km: "ទ្រឹស្តីបទដឺម័វ្រ កម្លាំង និងឫស" },
      { en: "Distances, dividing points and loci", km: "ចម្ងាយ ចំណុចចែកខាងក្នុង/ខាងក្រៅ និងទីតាំងចំណុច" }
    ],
    lessons: [
      {
        title: { en: "1. The complex plane", km: "១. ប្លង់ចំនួនកុំផ្លិច" },
        goal: { en: "Plot z = a + bi and find its conjugate and modulus.", km: "គូស z = a + bi ហើយរកចំនួនឆ្លាស់សញ្ញា និងម៉ូឌុល។" },
        keyIdea: { en: "The real part is a and the imaginary part is b. The point is (a, b) on the Argand plane. The modulus is its distance from the origin.", km: "ផ្នែកពិតគឺ a និងផ្នែកស្រមៃគឺ b។ ចំណុចមានកូអរដោនេ (a, b) លើប្លង់អាហ្គង់។ ម៉ូឌុលគឺចម្ងាយពីគល់កូអរដោនេ។" },
        formula: ["z = a + bi,  i² = −1", "z̄ = a − bi", "|z| = √(a² + b²)"],
        example: { question: { en: "For z = 3 + 4i, find z̄ and |z|.", km: "សម្រាប់ z = 3 + 4i ចូររក z̄ និង |z|។" }, steps: [
          { en: "Change the sign of the imaginary part: z̄ = 3 − 4i.", km: "ប្ដូរសញ្ញាផ្នែកស្រមៃ៖ z̄ = 3 − 4i។" },
          { en: "Use the modulus formula: |z| = √(3² + 4²) = √25 = 5.", km: "ប្រើរូបមន្តម៉ូឌុល៖ |z| = √(3² + 4²) = √25 = 5។" }
        ], answer: { en: "z̄ = 3 − 4i and |z| = 5", km: "z̄ = 3 − 4i និង |z| = 5" } },
        practice: { question: { en: "Find the modulus of 5 − 12i.", km: "ចូររកម៉ូឌុលនៃ 5 − 12i។" }, answer: { en: "√(25 + 144) = 13", km: "√(25 + 144) = 13" } }
      },
      {
        title: { en: "2. Polar form and operations", km: "២. ទម្រង់ប៉ូលែ និងប្រមាណវិធី" },
        goal: { en: "Convert between Cartesian and polar forms and multiply complex numbers.", km: "បម្លែងរវាងទម្រង់កាតេស៊ី និងប៉ូលែ ហើយគុណចំនួនកុំផ្លិច។" },
        keyIdea: { en: "Polar form records distance r from the origin and angle θ from the positive real axis. Multiplication multiplies moduli and adds arguments.", km: "ទម្រង់ប៉ូលែកត់ត្រាចម្ងាយ r ពីគល់កូអរដោនេ និងមុំ θ ពីអ័ក្សពិតវិជ្ជមាន។ ការគុណគឺគុណម៉ូឌុល និងបូកអាគុយម៉ង់។" },
        formula: ["z = r(cos θ + i sin θ)", "r = |z|,  tan θ = b/a (choose the correct quadrant)", "z₁z₂ = r₁r₂[cos(θ₁ + θ₂) + i sin(θ₁ + θ₂)]"],
        example: { question: { en: "Write 1 + i in polar form.", km: "សរសេរ 1 + i ជាទម្រង់ប៉ូលែ។" }, steps: [
          { en: "r = √(1² + 1²) = √2.", km: "r = √(1² + 1²) = √2។" },
          { en: "The point is in quadrant I and tan θ = 1, so θ = π/4.", km: "ចំណុចស្ថិតក្នុងចតុភាគ I ហើយ tan θ = 1 ដូច្នេះ θ = π/4។" }
        ], answer: { en: "√2(cos π/4 + i sin π/4)", km: "√2(cos π/4 + i sin π/4)" } },
        practice: { question: { en: "Find the modulus of −1 + i√3.", km: "ចូររកម៉ូឌុលនៃ −1 + i√3។" }, answer: { en: "√(1 + 3) = 2", km: "√(1 + 3) = 2" } }
      },
      {
        title: { en: "3. De Moivre's theorem and roots", km: "៣. ទ្រឹស្តីបទដឺម័វ្រ និងឫស" },
        goal: { en: "Raise a complex number to an integer power and describe its nth roots.", km: "លើកចំនួនកុំផ្លិចទៅកម្លាំងគត់ និងពិពណ៌នាឫសទី n។" },
        keyIdea: { en: "De Moivre's theorem multiplies the argument by n while raising the modulus to n. The nth roots have equally spaced arguments.", km: "ទ្រឹស្តីបទដឺម័វ្រលើកម៉ូឌុលទៅកម្លាំង n និងគុណអាគុយម៉ង់នឹង n។ ឫសទី n មានអាគុយម៉ង់ចែកចន្លោះស្មើៗគ្នា។" },
        formula: ["[r(cos θ + i sin θ)]ⁿ = rⁿ(cos nθ + i sin nθ)", "wₖ = r^(1/n)[cos((θ + 2kπ)/n) + i sin((θ + 2kπ)/n)]"],
        example: { question: { en: "Find (cos π/6 + i sin π/6)³.", km: "ចូររក (cos π/6 + i sin π/6)³។" }, steps: [
          { en: "Keep the modulus 1 and multiply the angle by 3.", km: "រក្សាម៉ូឌុល 1 ហើយគុណមុំដោយ 3។" },
          { en: "The new angle is 3 × π/6 = π/2.", km: "មុំថ្មីគឺ 3 × π/6 = π/2។" }
        ], answer: { en: "cos π/2 + i sin π/2 = i", km: "cos π/2 + i sin π/2 = i" } },
        practice: { question: { en: "Use De Moivre's theorem to find (cos π/4 + i sin π/4)².", km: "ប្រើទ្រឹស្តីបទដឺម័វ្រដើម្បីរក (cos π/4 + i sin π/4)²។" }, answer: { en: "cos π/2 + i sin π/2 = i", km: "cos π/2 + i sin π/2 = i" } }
      },
      {
        title: { en: "4. Geometry on the complex plane", km: "៤. ធរណីមាត្រលើប្លង់ចំនួនកុំផ្លិច" },
        goal: { en: "Use complex numbers to express distances, circles and dividing points.", km: "ប្រើចំនួនកុំផ្លិចដើម្បីតំណាងចម្ងាយ រង្វង់ និងចំណុចចែក។" },
        keyIdea: { en: "The distance between two complex points is the modulus of their difference. The locus |z − a| = r is a circle with centre a and radius r.", km: "ចម្ងាយរវាងចំណុចកុំផ្លិចពីរ គឺម៉ូឌុលនៃផលដករបស់វា។ ទីតាំងចំណុច |z − a| = r ជារង្វង់ដែលមានផ្ចិត a និងកាំ r។" },
        formula: ["Distance between z₁ and z₂: |z₂ − z₁|", "Circle with centre a and radius r: |z − a| = r", "Internal division in ratio m:n: z = (nz₁ + mz₂)/(m + n)"],
        example: { question: { en: "Find the distance between z₁ = 1 + 2i and z₂ = 4 + 6i.", km: "ចូររកចម្ងាយរវាង z₁ = 1 + 2i និង z₂ = 4 + 6i។" }, steps: [
          { en: "Subtract: z₂ − z₁ = (4 − 1) + (6 − 2)i = 3 + 4i.", km: "ដក៖ z₂ − z₁ = (4 − 1) + (6 − 2)i = 3 + 4i។" },
          { en: "Take the modulus: |3 + 4i| = √(3² + 4²) = 5.", km: "រកម៉ូឌុល៖ |3 + 4i| = √(3² + 4²) = 5។" }
        ], answer: { en: "The distance is 5 units.", km: "ចម្ងាយគឺ 5 ឯកតា។" } },
        practice: { question: { en: "Describe the locus |z − 2| = 3.", km: "ចូរពិពណ៌នាទីតាំងចំណុច |z − 2| = 3។" }, answer: { en: "A circle with centre (2, 0) on the real axis and radius 3.", km: "រង្វង់មានផ្ចិត (2, 0) លើអ័ក្សពិត និងកាំ 3។" } }
      }
    ]
  },
  {
    slug: "chapter-06", number: "06",
    title: { en: "Differentiation", km: "ដេរីវេ" }, hours: 46,
    introduction: { en: "Differentiation measures how quickly a function changes. It connects limits, gradients of tangent lines, increasing/decreasing behaviour and the shape of graphs.", km: "ដេរីវេវាស់អត្រាដែលអនុគមន៍ផ្លាស់ប្ដូរ។ វាភ្ជាប់លីមីត ជម្រាលបន្ទាត់ប៉ះ លក្ខណៈកើន/ថយ និងរូបរាងក្រាប។" },
    outcomes: [
      { en: "Understand limits and differentiate polynomial and rational functions.", km: "យល់ពីលីមីត និងរកដេរីវេអនុគមន៍ពហុធា និងអនុគមន៍សនិទាន។" },
      { en: "Find tangent lines and use derivatives to study variation and sketch graphs.", km: "រកសមីការបន្ទាត់ប៉ះ និងប្រើដេរីវេដើម្បីសិក្សាការប្រែប្រួល និងគូសក្រាប។" },
      { en: "Apply derivatives to equations, inequalities and real problems.", km: "អនុវត្តដេរីវេលើសមីការ វិសមីការ និងបញ្ហាជាក់ស្តែង។" }
    ],
    syllabus: [
      { en: "Limits and derivatives", km: "លីមីត និងដេរីវេ" },
      { en: "Tangent lines, increasing/decreasing functions and local extrema", km: "បន្ទាត់ប៉ះ អនុគមន៍កើន/ថយ និងតម្លៃអតិបរមា/អប្បបរមាមូលដ្ឋាន" },
      { en: "Polynomial and simple rational function graphs; asymptotes", km: "ក្រាបអនុគមន៍ពហុធា និងសនិទានសាមញ្ញ អាស៊ីមតូត" },
      { en: "Applications to equations and inequalities", km: "ការអនុវត្តទៅសមីការ និងវិសមីការ" }
    ],
    lessons: [
      {
        title: { en: "1. Limits", km: "១. លីមីត" },
        goal: { en: "Evaluate a limit by substitution or algebraic simplification.", km: "គណនាលីមីតដោយជំនួសតម្លៃ ឬសម្រួលពិជគណិត។" },
        keyIdea: { en: "The limit describes the value a function approaches as x approaches a number. The function's value at that number may be different or may not exist.", km: "លីមីតពិពណ៌នាតម្លៃដែលអនុគមន៍ខិតទៅជិត នៅពេល x ខិតទៅជិតចំនួនមួយ។ តម្លៃអនុគមន៍នៅចំណុចនោះអាចខុសគ្នា ឬមិនមាន។" },
        formula: ["limₓ→a f(x) = L", "If f is continuous at a: limₓ→a f(x) = f(a)"],
        example: { question: { en: "Find limₓ→2 (x² + 3x).", km: "ចូររក limₓ→2 (x² + 3x)។" }, steps: [
          { en: "This polynomial is continuous, so substitute x = 2.", km: "ពហុធានេះបន្តជាប់ ដូច្នេះជំនួស x = 2។" },
          { en: "2² + 3(2) = 4 + 6 = 10.", km: "2² + 3(2) = 4 + 6 = 10។" }
        ], answer: { en: "10", km: "10" } },
        practice: { question: { en: "Find limₓ→3 (2x − 1).", km: "ចូររក limₓ→3 (2x − 1)។" }, answer: { en: "5", km: "5" } }
      },
      {
        title: { en: "2. Derivative rules", km: "២. ច្បាប់ដេរីវេ" },
        goal: { en: "Differentiate powers, constants, sums and simple rational functions.", km: "រកដេរីវេកម្លាំង ថេរ ផលបូក និងអនុគមន៍សនិទានសាមញ្ញ។" },
        keyIdea: { en: "The derivative f′(x) is the instantaneous rate of change and the gradient of the tangent. For a power xⁿ, bring n down and reduce the exponent by one.", km: "ដេរីវេ f′(x) គឺអត្រាប្រែប្រួលភ្លាមៗ និងជម្រាលបន្ទាត់ប៉ះ។ សម្រាប់ xⁿ ទាញ n មកគុណខាងមុខ ហើយបន្ថយនិទស្សន្តមួយ។" },
        formula: ["d/dx (xⁿ) = nxⁿ⁻¹", "d/dx (c) = 0", "d/dx [af(x) + bg(x)] = af′(x) + bg′(x)"],
        example: { question: { en: "Differentiate f(x) = 3x⁴ − 5x² + 7.", km: "រកដេរីវេ f(x) = 3x⁴ − 5x² + 7។" }, steps: [
          { en: "Differentiate each term: 3 × 4x³ − 5 × 2x.", km: "រកដេរីវេតាមតួ៖ 3 × 4x³ − 5 × 2x។" },
          { en: "The derivative of the constant 7 is zero.", km: "ដេរីវេនៃចំនួនថេរ 7 គឺសូន្យ។" }
        ], answer: { en: "f′(x) = 12x³ − 10x", km: "f′(x) = 12x³ − 10x" } },
        practice: { question: { en: "Find the derivative of 5x³ + 2x − 9.", km: "ចូររកដេរីវេនៃ 5x³ + 2x − 9។" }, answer: { en: "15x² + 2", km: "15x² + 2" } }
      },
      {
        title: { en: "3. Tangents and stationary points", km: "៣. បន្ទាត់ប៉ះ និងចំណុចស្ថិតិ" },
        goal: { en: "Find tangent equations and identify stationary points.", km: "រកសមីការបន្ទាត់ប៉ះ និងកំណត់ចំណុចស្ថិតិ។" },
        keyIdea: { en: "At x = a, the tangent gradient is f′(a). A stationary point occurs when f′(a) = 0. A sign change in f′ helps identify a local maximum or minimum.", km: "នៅ x = a ជម្រាលបន្ទាត់ប៉ះគឺ f′(a)។ ចំណុចស្ថិតិកើតឡើងពេល f′(a) = 0។ ការប្រែសញ្ញារបស់ f′ ជួយសម្គាល់អតិបរមា ឬអប្បបរមាមូលដ្ឋាន។" },
        formula: ["y − f(a) = f′(a)(x − a)", "Stationary point: f′(x) = 0"],
        example: { question: { en: "Find the tangent to y = x² at x = 2.", km: "ចូររកបន្ទាត់ប៉ះនៃ y = x² នៅ x = 2។" }, steps: [
          { en: "f′(x) = 2x, so the gradient at x = 2 is 4.", km: "f′(x) = 2x ដូច្នេះជម្រាលនៅ x = 2 គឺ 4។" },
          { en: "The point is (2, 4). Use y − 4 = 4(x − 2).", km: "ចំណុចគឺ (2, 4)។ ប្រើ y − 4 = 4(x − 2)។" }
        ], answer: { en: "y = 4x − 4", km: "y = 4x − 4" } },
        practice: { question: { en: "Find the stationary x-value of f(x) = x² − 6x + 1.", km: "ចូររកតម្លៃ x នៃចំណុចស្ថិតិ សម្រាប់ f(x) = x² − 6x + 1។" }, answer: { en: "f′ = 2x − 6 = 0, so x = 3.", km: "f′ = 2x − 6 = 0 ដូច្នេះ x = 3។" } }
      },
      {
        title: { en: "4. Variation, curve sketching and asymptotes", km: "៤. ការប្រែប្រួល ការគូសក្រាប និងអាស៊ីមតូត" },
        goal: { en: "Use derivative signs and asymptotes to understand a graph.", km: "ប្រើសញ្ញាដេរីវេ និងអាស៊ីមតូតដើម្បីយល់ពីក្រាប។" },
        keyIdea: { en: "If f′(x) > 0, the function is increasing; if f′(x) < 0, it is decreasing. For rational functions, denominator zeros and end behaviour help locate asymptotes.", km: "បើ f′(x) > 0 អនុគមន៍កើន; បើ f′(x) < 0 អនុគមន៍ថយ។ សម្រាប់អនុគមន៍សនិទាន សូន្យនៃភាគបែង និងឥរិយាបថនៅចុងក្រោយជួយកំណត់អាស៊ីមតូត។" },
        formula: ["f′(x) > 0 ⇒ increasing", "f′(x) < 0 ⇒ decreasing", "For y = (ax + b)/(cx + d), x = −d/c is a vertical asymptote when not cancelled; y = a/c is the horizontal asymptote when c ≠ 0."],
        example: { question: { en: "Describe the variation of f(x) = x².", km: "ចូរពិពណ៌នាការប្រែប្រួលនៃ f(x) = x²។" }, steps: [
          { en: "Differentiate: f′(x) = 2x.", km: "រកដេរីវេ៖ f′(x) = 2x។" },
          { en: "For x < 0, f′ is negative; for x > 0, f′ is positive.", km: "សម្រាប់ x < 0 ដេរីវេអវិជ្ជមាន; សម្រាប់ x > 0 ដេរីវេវិជ្ជមាន។" }
        ], answer: { en: "Decreasing on (−∞, 0), increasing on (0, ∞), with a minimum at (0, 0).", km: "ថយលើ (−∞, 0) កើនលើ (0, ∞) និងមានអប្បបរមានៅ (0, 0)។" } },
        practice: { question: { en: "Where is f(x) = x³ increasing?", km: "តើ f(x) = x³ កើននៅចន្លោះណា?" }, answer: { en: "f′(x) = 3x² ≥ 0, so it is increasing on all real numbers.", km: "f′(x) = 3x² ≥ 0 ដូច្នេះវាកើនលើចំនួនពិតទាំងអស់។" } }
      },
      {
        title: { en: "5. Differentiating rational functions", km: "៥. ការរកដេរីវេអនុគមន៍សនិទាន" },
        goal: { en: "Apply the quotient rule to a ratio of differentiable functions.", km: "អនុវត្តច្បាប់ផលចែកទៅលើផលចែកនៃអនុគមន៍ដែលអាចរកដេរីវេបាន។" },
        keyIdea: { en: "For a quotient u/v, differentiate the numerator times the denominator, subtract the numerator times the derivative of the denominator, then divide by the denominator squared.", km: "សម្រាប់ u/v ត្រូវយកដេរីវេភាគយកគុណភាគបែង ដកភាគយកគុណដេរីវេភាគបែង រួចចែកនឹងការ៉េភាគបែង។" },
        formula: ["d/dx (u/v) = (u′v − uv′)/v²,  v ≠ 0"],
        example: { question: { en: "Differentiate f(x) = (x + 1)/(x − 1).", km: "រកដេរីវេ f(x) = (x + 1)/(x − 1)។" }, steps: [
          { en: "Let u = x + 1 and v = x − 1. Then u′ = 1 and v′ = 1.", km: "ដាក់ u = x + 1 និង v = x − 1។ ដូច្នេះ u′ = 1 និង v′ = 1។" },
          { en: "Apply the quotient rule: f′(x) = [(1)(x − 1) − (x + 1)(1)]/(x − 1)².", km: "ប្រើច្បាប់ផលចែក៖ f′(x) = [(1)(x − 1) − (x + 1)(1)]/(x − 1)²។" },
          { en: "Simplify the numerator: x − 1 − x − 1 = −2.", km: "សម្រួលភាគយក៖ x − 1 − x − 1 = −2។" }
        ], answer: { en: "f′(x) = −2/(x − 1)², x ≠ 1", km: "f′(x) = −2/(x − 1)², x ≠ 1" } },
        practice: { question: { en: "Differentiate f(x) = x/(x + 2).", km: "រកដេរីវេ f(x) = x/(x + 2)។" }, answer: { en: "f′(x) = 2/(x + 2)², x ≠ −2", km: "f′(x) = 2/(x + 2)², x ≠ −2" } }
      }
    ]
  },
  {
    slug: "chapter-07", number: "07",
    title: { en: "Probability", km: "ប្រូបាប" }, hours: 24,
    introduction: { en: "Probability measures how likely an event is. This unit builds sample spaces and event operations, then studies conditional probability and independence.", km: "ប្រូបាបវាស់កម្រិតលទ្ធភាពនៃព្រឹត្តិការណ៍។ ជំពូកនេះសិក្សាសំណុំលទ្ធផល ប្រមាណវិធីព្រឹត្តិការណ៍ ប្រូបាបមានលក្ខខណ្ឌ និងភាពឯករាជ្យ។" },
    outcomes: [
      { en: "Describe sample spaces and event types.", km: "ពិពណ៌នាសំណុំលទ្ធផល និងប្រភេទព្រឹត្តិការណ៍។" },
      { en: "Calculate conditional probability and distinguish dependent and independent events.", km: "គណនាប្រូបាបមានលក្ខខណ្ឌ និងបែងចែកព្រឹត្តិការណ៍ពឹងផ្អែក/ឯករាជ្យ។" }
    ],
    syllabus: [
      { en: "Meaning of probability and sample spaces", km: "ន័យប្រូបាប និងសំណុំលទ្ធផល" },
      { en: "Total, null, union, intersection, mutually exclusive and complementary events", km: "ព្រឹត្តិការណ៍សរុប ទទេ ផលរួម ផលប្រសព្វ មិនអាចកើតរួម និងបំពេញគ្នា" },
      { en: "Conditional probability", km: "ប្រូបាបមានលក្ខខណ្ឌ" },
      { en: "Dependent and independent events", km: "ព្រឹត្តិការណ៍ពឹងផ្អែក និងឯករាជ្យ" }
    ],
    lessons: [
      {
        title: { en: "1. Sample spaces and events", km: "១. សំណុំលទ្ធផល និងព្រឹត្តិការណ៍" },
        goal: { en: "List outcomes and calculate probability for equally likely outcomes.", km: "រាយលទ្ធផល និងគណនាប្រូបាបសម្រាប់លទ្ធផលដែលមានឱកាសស្មើគ្នា។" },
        keyIdea: { en: "A sample space S is the set of all possible outcomes. An event A is a subset of S. For equally likely outcomes, probability is favourable outcomes divided by total outcomes.", km: "សំណុំលទ្ធផល S ជាសំណុំលទ្ធផលដែលអាចកើតមានទាំងអស់។ ព្រឹត្តិការណ៍ A ជាសំណុំរងនៃ S។ សម្រាប់លទ្ធផលមានឱកាសស្មើគ្នា ប្រូបាបស្មើចំនួនលទ្ធផលដែលចង់បានចែកនឹងចំនួនលទ្ធផលសរុប។" },
        formula: ["P(A) = n(A) / n(S)", "0 ≤ P(A) ≤ 1", "P(Aᶜ) = 1 − P(A)"],
        example: { question: { en: "A fair die is rolled. Find the probability of an even number.", km: "គេចោលគ្រាប់ឡុកឡាក់ត្រឹមត្រូវមួយ។ ចូររកប្រូបាបនៃលេខគូ។" }, steps: [
          { en: "The sample space is {1, 2, 3, 4, 5, 6}.", km: "សំណុំលទ្ធផលគឺ {1, 2, 3, 4, 5, 6}។" },
          { en: "The even outcomes are {2, 4, 6}: three favourable outcomes out of six.", km: "លទ្ធផលលេខគូគឺ {2, 4, 6}៖ មាន 3 លទ្ធផលក្នុងចំណោម 6។" }
        ], answer: { en: "3/6 = 1/2", km: "3/6 = 1/2" } },
        practice: { question: { en: "What is the probability of rolling a number greater than 4 on a fair die?", km: "តើប្រូបាបនៃការចោលបានលេខធំជាង 4 លើគ្រាប់ឡុកឡាក់ត្រឹមត្រូវគឺប៉ុន្មាន?" }, answer: { en: "2/6 = 1/3", km: "2/6 = 1/3" } }
      },
      {
        title: { en: "2. Combining events", km: "២. ការបញ្ចូលព្រឹត្តិការណ៍" },
        goal: { en: "Use union, intersection, complement and mutually exclusive events.", km: "ប្រើផលរួម ផលប្រសព្វ ព្រឹត្តិការណ៍បំពេញ និងព្រឹត្តិការណ៍មិនអាចកើតរួម។" },
        keyIdea: { en: "A ∪ B means A or B (or both); A ∩ B means both A and B. Mutually exclusive events cannot happen together.", km: "A ∪ B មានន័យថា A ឬ B (ឬទាំងពីរ); A ∩ B មានន័យថា A និង B កើតឡើងទាំងពីរ។ ព្រឹត្តិការណ៍មិនអាចកើតរួមមិនអាចកើតពេលតែមួយ។" },
        formula: ["P(A ∪ B) = P(A) + P(B) − P(A ∩ B)", "If A and B are mutually exclusive: P(A ∩ B) = 0"],
        example: { question: { en: "If P(A) = 0.4, P(B) = 0.5 and P(A ∩ B) = 0.2, find P(A ∪ B).", km: "បើ P(A) = 0.4, P(B) = 0.5 និង P(A ∩ B) = 0.2 ចូររក P(A ∪ B)។" }, steps: [
          { en: "Use the union formula: 0.4 + 0.5 − 0.2.", km: "ប្រើរូបមន្តផលរួម៖ 0.4 + 0.5 − 0.2។" },
          { en: "Calculate the result.", km: "គណនាលទ្ធផល។" }
        ], answer: { en: "0.7", km: "0.7" } },
        practice: { question: { en: "If A and B are mutually exclusive, what is P(A ∩ B)?", km: "បើ A និង B មិនអាចកើតរួម តើ P(A ∩ B) ស្មើប៉ុន្មាន?" }, answer: { en: "0", km: "0" } }
      },
      {
        title: { en: "3. Conditional probability and independence", km: "៣. ប្រូបាបមានលក្ខខណ្ឌ និងភាពឯករាជ្យ" },
        goal: { en: "Calculate conditional probabilities and test independence.", km: "គណនាប្រូបាបមានលក្ខខណ្ឌ និងពិនិត្យភាពឯករាជ្យ។" },
        keyIdea: { en: "P(A|B) means the probability of A when B is already known to have occurred. Events are independent when knowing one does not change the probability of the other.", km: "P(A|B) មានន័យថាប្រូបាបនៃ A នៅពេលដឹងថា B បានកើតឡើងរួច។ ព្រឹត្តិការណ៍ឯករាជ្យមានន័យថាការដឹងអំពីមួយ មិនផ្លាស់ប្ដូរប្រូបាបរបស់មួយទៀត។" },
        formula: ["P(A|B) = P(A ∩ B) / P(B),  P(B) > 0", "A and B independent ⇔ P(A ∩ B) = P(A)P(B)"],
        example: { question: { en: "If P(A ∩ B) = 0.12 and P(B) = 0.3, find P(A|B).", km: "បើ P(A ∩ B) = 0.12 និង P(B) = 0.3 ចូររក P(A|B)។" }, steps: [
          { en: "Use P(A|B) = P(A ∩ B)/P(B).", km: "ប្រើ P(A|B) = P(A ∩ B)/P(B)។" },
          { en: "Calculate 0.12/0.3 = 0.4.", km: "គណនា 0.12/0.3 = 0.4។" }
        ], answer: { en: "0.4", km: "0.4" } },
        practice: { question: { en: "If P(A) = 0.5 and P(B) = 0.2 and they are independent, find P(A ∩ B).", km: "បើ P(A) = 0.5 និង P(B) = 0.2 ហើយព្រឹត្តិការណ៍ឯករាជ្យ ចូររក P(A ∩ B)។" }, answer: { en: "0.5 × 0.2 = 0.1", km: "0.5 × 0.2 = 0.1" } }
      }
    ]
  },
  {
    slug: "chapter-08", number: "08",
    title: { en: "Statistics", km: "ស្ថិតិ" }, hours: 16,
    introduction: { en: "Statistics summarizes and interprets data. This chapter focuses on spread: range, quartiles, deciles, percentiles, variance, standard deviation and the normal distribution.", km: "ស្ថិតិជួយសង្ខេប និងបកស្រាយទិន្នន័យ។ ជំពូកនេះផ្តោតលើការបែកខ្ញែក៖ ជួរ ត្រីមាស ទសភាគ ភាគរយ វ៉ារ្យង់ គម្លាតស្តង់ដារ និងបំណែងចែកធម្មតា។" },
    outcomes: [
      { en: "Calculate range, quartiles, deciles and percentiles.", km: "គណនាជួរ ត្រីមាស ទសភាគ និងភាគរយ។" },
      { en: "Calculate variance and standard deviation and interpret data displays.", km: "គណនាវ៉ារ្យង់ និងគម្លាតស្តង់ដារ ហើយបកស្រាយទិន្នន័យតាមក្រាប។" }
    ],
    syllabus: [
      { en: "Range and measures of position: quartiles, deciles and percentiles", km: "ជួរ និងរង្វាស់ទីតាំង៖ ត្រីមាស ទសភាគ និងភាគរយ" },
      { en: "Variance and standard deviation", km: "វ៉ារ្យង់ និងគម្លាតស្តង់ដារ" },
      { en: "Normal distribution", km: "បំណែងចែកធម្មតា" }
    ],
    lessons: [
      {
        title: { en: "1. Range, quartiles and percentiles", km: "១. ជួរ ត្រីមាស និងភាគរយ" },
        goal: { en: "Order data and locate measures of position.", km: "រៀបលំដាប់ទិន្នន័យ និងកំណត់រង្វាស់ទីតាំង។" },
        keyIdea: { en: "The range is maximum minus minimum. Quartiles divide ordered data into four parts; deciles into ten; percentiles into one hundred. For ungrouped data, schools may use different position conventions, so follow the convention stated by your teacher or textbook.", km: "ជួរស្មើតម្លៃធំបំផុតដកតម្លៃតូចបំផុត។ ត្រីមាសចែកទិន្នន័យតាមលំដាប់ជាបួនផ្នែក ទសភាគជាដប់ផ្នែក និងភាគរយជាមួយរយផ្នែក។ សម្រាប់ទិន្នន័យមិនជាក្រុម វិធីកំណត់ទីតាំងអាចខុសគ្នាតាមសៀវភៅ ដូច្នេះត្រូវប្រើវិធីដែលគ្រូ ឬសៀវភៅកំណត់។" },
        formula: ["Range = maximum − minimum", "Common position convention: Qₖ position = k(n + 1)/4"],
        example: { question: { en: "Find the range of 2, 4, 4, 6, 9.", km: "ចូររកជួរនៃ 2, 4, 4, 6, 9។" }, steps: [
          { en: "The maximum is 9 and the minimum is 2.", km: "តម្លៃធំបំផុតគឺ 9 ហើយតម្លៃតូចបំផុតគឺ 2។" },
          { en: "Subtract: 9 − 2 = 7.", km: "ដក៖ 9 − 2 = 7។" }
        ], answer: { en: "Range = 7", km: "ជួរ = 7" } },
        practice: { question: { en: "Find the range of 3, 7, 8, 12, 15.", km: "ចូររកជួរនៃ 3, 7, 8, 12, 15។" }, answer: { en: "15 − 3 = 12", km: "15 − 3 = 12" } }
      },
      {
        title: { en: "2. Variance and standard deviation", km: "២. វ៉ារ្យង់ និងគម្លាតស្តង់ដារ" },
        goal: { en: "Measure how far data values spread around their mean.", km: "វាស់កម្រិតដែលតម្លៃទិន្នន័យខុសពីមធ្យមភាគ។" },
        keyIdea: { en: "Variance is the mean of squared deviations from the mean (for a population). Standard deviation is the square root of variance, so it uses the same units as the data.", km: "វ៉ារ្យង់គឺមធ្យមភាគនៃការ៉េគម្លាតពីមធ្យមភាគ (សម្រាប់ប្រជាសាស្ត្រ)។ គម្លាតស្តង់ដារគឺឫសការ៉េនៃវ៉ារ្យង់ ដូច្នេះវាមានឯកតាដូចទិន្នន័យ។" },
        formula: ["Population variance: σ² = Σ(xᵢ − μ)² / N", "Population standard deviation: σ = √σ²"],
        example: { question: { en: "Find the population variance of 2, 4, 6.", km: "ចូររកវ៉ារ្យង់ប្រជាសាស្ត្រនៃ 2, 4, 6។" }, steps: [
          { en: "Mean μ = (2 + 4 + 6)/3 = 4.", km: "មធ្យមភាគ μ = (2 + 4 + 6)/3 = 4។" },
          { en: "Squared deviations: (−2)², 0², 2² = 4, 0, 4.", km: "ការ៉េគម្លាត៖ (−2)², 0², 2² = 4, 0, 4។" },
          { en: "Variance = (4 + 0 + 4)/3 = 8/3.", km: "វ៉ារ្យង់ = (4 + 0 + 4)/3 = 8/3។" }
        ], answer: { en: "σ² = 8/3; σ = √(8/3) ≈ 1.633", km: "σ² = 8/3; σ = √(8/3) ≈ 1.633" } },
        practice: { question: { en: "Find the population variance of 1, 3, 5.", km: "ចូររកវ៉ារ្យង់ប្រជាសាស្ត្រនៃ 1, 3, 5។" }, answer: { en: "Mean = 3; variance = (4 + 0 + 4)/3 = 8/3.", km: "មធ្យមភាគ = 3; វ៉ារ្យង់ = (4 + 0 + 4)/3 = 8/3។" } }
      },
      {
        title: { en: "3. Normal distribution", km: "៣. បំណែងចែកធម្មតា" },
        goal: { en: "Recognize the bell-shaped curve and interpret mean and standard deviation.", km: "ស្គាល់ខ្សែកោងរាងកណ្ដឹង និងបកស្រាយមធ្យមភាគ/គម្លាតស្តង់ដារ។" },
        keyIdea: { en: "A normal distribution is symmetric about its mean μ. The standard deviation σ describes its spread. Approximately 68%, 95% and 99.7% of values lie within 1σ, 2σ and 3σ of the mean, respectively.", km: "បំណែងចែកធម្មតាមានសមមាត្រជុំវិញមធ្យមភាគ μ។ គម្លាតស្តង់ដារ σ បង្ហាញការបែកខ្ញែក។ ប្រហែល 68%, 95% និង 99.7% នៃតម្លៃស្ថិតក្នុងចន្លោះ 1σ, 2σ និង 3σ ពីមធ្យមភាគ រៀងគ្នា។" },
        formula: ["z = (x − μ)/σ", "About 68% within μ ± σ; 95% within μ ± 2σ; 99.7% within μ ± 3σ"],
        example: { question: { en: "A normal distribution has μ = 70 and σ = 5. What interval is about 68% of the data in?", km: "បំណែងចែកធម្មតាមួយមាន μ = 70 និង σ = 5។ តើប្រហែល 68% នៃទិន្នន័យស្ថិតក្នុងចន្លោះណា?" }, steps: [
          { en: "Use one standard deviation on each side: μ − σ to μ + σ.", km: "ប្រើគម្លាតស្តង់ដារមួយខាងនីមួយៗ៖ μ − σ ដល់ μ + σ។" },
          { en: "70 − 5 = 65 and 70 + 5 = 75.", km: "70 − 5 = 65 និង 70 + 5 = 75។" }
        ], answer: { en: "Approximately 65 to 75.", km: "ប្រហែលពី 65 ដល់ 75។" } },
        practice: { question: { en: "If μ = 100 and σ = 10, give the approximate 95% interval.", km: "បើ μ = 100 និង σ = 10 ចូររកចន្លោះប្រហែល 95%។" }, answer: { en: "μ ± 2σ = 80 to 120", km: "μ ± 2σ = 80 ដល់ 120" } }
      }
    ]
  },
  {
    slug: "chapter-09", number: "09",
    title: { en: "Vectors in Space", km: "វ៉ិចទ័រក្នុងលំហ" }, hours: 36,
    introduction: { en: "Vectors describe magnitude and direction in three-dimensional space. You will calculate with components, use the scalar product, and work with points, lines, planes and spheres.", km: "វ៉ិចទ័រពិពណ៌នាទំហំ និងទិសដៅក្នុងលំហបីវិមាត្រ។ អ្នកនឹងគណនាតាមកុំប៉ូសង់ ប្រើផលគុណស្កាលែរ និងសិក្សាចំណុច បន្ទាត់ ប្លង់ និងស្វ៊ែរ។" },
    outcomes: [
      { en: "Perform vector operations and calculate scalar products in space.", km: "អនុវត្តប្រមាណវិធីវ៉ិចទ័រ និងគណនាផលគុណស្កាលែរក្នុងលំហ។" },
      { en: "Use position vectors to solve division, line, plane and distance problems.", km: "ប្រើវ៉ិចទ័រទីតាំងដើម្បីដោះស្រាយបញ្ហាចែកចំណុច បន្ទាត់ ប្លង់ និងចម្ងាយ។" }
    ],
    syllabus: [
      { en: "3D vectors, components and vector operations", km: "វ៉ិចទ័រ 3D កុំប៉ូសង់ និងប្រមាណវិធីវ៉ិចទ័រ" },
      { en: "Scalar product and distance between points", km: "ផលគុណស្កាលែរ និងចម្ងាយរវាងចំណុច" },
      { en: "Position vectors, equations of lines and planes", km: "វ៉ិចទ័រទីតាំង សមីការបន្ទាត់ និងប្លង់" },
      { en: "Sphere equations and distance from a point to a plane", km: "សមីការស្វ៊ែរ និងចម្ងាយពីចំណុចទៅប្លង់" }
    ],
    lessons: [
      {
        title: { en: "1. Vectors and components in 3D", km: "១. វ៉ិចទ័រ និងកុំប៉ូសង់ក្នុងលំហ" },
        goal: { en: "Add vectors, multiply by scalars and calculate magnitudes.", km: "បូកវ៉ិចទ័រ គុណនឹងស្កាលែរ និងគណនាម៉ូឌុល។" },
        keyIdea: { en: "A 3D vector has three components along the x, y and z axes. Add or subtract matching components.", km: "វ៉ិចទ័រ 3D មានកុំប៉ូសង់បីតាមអ័ក្ស x, y និង z។ បូក ឬដកកុំប៉ូសង់ដែលត្រូវគ្នា។" },
        formula: ["u = (u₁, u₂, u₃)", "|u| = √(u₁² + u₂² + u₃²)", "u + v = (u₁ + v₁, u₂ + v₂, u₃ + v₃)"],
        example: { question: { en: "Find the magnitude of v = (2, −3, 6).", km: "ចូររកម៉ូឌុលនៃ v = (2, −3, 6)។" }, steps: [
          { en: "Square the components: 2² + (−3)² + 6².", km: "ការ៉េកុំប៉ូសង់៖ 2² + (−3)² + 6²។" },
          { en: "Add and take the square root: √(4 + 9 + 36) = √49.", km: "បូកហើយដកឫសការ៉េ៖ √(4 + 9 + 36) = √49។" }
        ], answer: { en: "|v| = 7", km: "|v| = 7" } },
        practice: { question: { en: "Find (1, 2, 3) + (4, −1, 2).", km: "ចូរគណនា (1, 2, 3) + (4, −1, 2)។" }, answer: { en: "(5, 1, 5)", km: "(5, 1, 5)" } }
      },
      {
        title: { en: "2. Scalar product and angle", km: "២. ផលគុណស្កាលែរ និងមុំ" },
        goal: { en: "Calculate a dot product and determine whether vectors are perpendicular.", km: "គណនាផលគុណចំណុច និងកំណត់ថាវ៉ិចទ័រកែងគ្នាឬអត់។" },
        keyIdea: { en: "The scalar product gives a number. If the dot product is zero for two non-zero vectors, they are perpendicular.", km: "ផលគុណស្កាលែរផ្តល់លទ្ធផលជាចំនួន។ បើផលគុណចំណុចស្មើសូន្យសម្រាប់វ៉ិចទ័រមិនសូន្យពីរ នោះវាកែងគ្នា។" },
        formula: ["u · v = u₁v₁ + u₂v₂ + u₃v₃", "u · v = |u||v|cos θ", "u · v = 0 ⇒ u ⟂ v (for non-zero vectors)"],
        example: { question: { en: "Find (1, 2, 0) · (2, −1, 3).", km: "ចូររក (1, 2, 0) · (2, −1, 3)។" }, steps: [
          { en: "Multiply matching components: 1×2 + 2×(−1) + 0×3.", km: "គុណកុំប៉ូសង់ដែលត្រូវគ្នា៖ 1×2 + 2×(−1) + 0×3។" },
          { en: "Add: 2 − 2 + 0 = 0.", km: "បូក៖ 2 − 2 + 0 = 0។" }
        ], answer: { en: "0; the non-zero vectors are perpendicular.", km: "0; វ៉ិចទ័រមិនសូន្យទាំងពីរកែងគ្នា។" } },
        practice: { question: { en: "Find (2, 1, 3) · (1, 0, −2).", km: "ចូររក (2, 1, 3) · (1, 0, −2)។" }, answer: { en: "2 + 0 − 6 = −4", km: "2 + 0 − 6 = −4" } }
      },
      {
        title: { en: "3. Lines, planes and distance", km: "៣. បន្ទាត់ ប្លង់ និងចម្ងាយ" },
        goal: { en: "Use position vectors and vector equations to describe lines and planes.", km: "ប្រើវ៉ិចទ័រទីតាំង និងសមីការវ៉ិចទ័រដើម្បីពិពណ៌នាបន្ទាត់ និងប្លង់។" },
        keyIdea: { en: "A line is determined by a point and a direction vector. A plane can be written with a normal vector and one point. Distances in 3D use all three coordinate differences.", km: "បន្ទាត់កំណត់ដោយចំណុចមួយ និងវ៉ិចទ័រទិសដៅមួយ។ ប្លង់អាចសរសេរដោយវ៉ិចទ័រកែង និងចំណុចមួយ។ ចម្ងាយក្នុង 3D ប្រើផលដកកូអរដោនេទាំងបី។" },
        formula: ["Line: r = a + t d", "Plane: n · (r − a) = 0", "Distance AB = √[(x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²]"],
        example: { question: { en: "Find the distance between A(1, 2, 3) and B(4, 6, 3).", km: "ចូររកចម្ងាយរវាង A(1, 2, 3) និង B(4, 6, 3)។" }, steps: [
          { en: "Coordinate differences are 3, 4 and 0.", km: "ផលដកកូអរដោនេគឺ 3, 4 និង 0។" },
          { en: "Distance = √(3² + 4² + 0²) = √25.", km: "ចម្ងាយ = √(3² + 4² + 0²) = √25។" }
        ], answer: { en: "5 units", km: "5 ឯកតា" } },
        practice: { question: { en: "Find the distance from (0, 0, 0) to (2, 2, 1).", km: "ចូររកចម្ងាយពី (0, 0, 0) ទៅ (2, 2, 1)។" }, answer: { en: "√(4 + 4 + 1) = 3", km: "√(4 + 4 + 1) = 3" } }
      },
      {
        title: { en: "4. Spheres and point-to-plane distance", km: "៤. ស្វ៊ែរ និងចម្ងាយពីចំណុចទៅប្លង់" },
        goal: { en: "Recognize the equation of a sphere and calculate the distance from a point to a plane.", km: "ស្គាល់សមីការស្វ៊ែរ និងគណនាចម្ងាយពីចំណុចទៅប្លង់។" },
        keyIdea: { en: "A sphere is the set of points a fixed distance r from its centre. The distance from a point to a plane is measured along the perpendicular direction.", km: "ស្វ៊ែរជាសំណុំចំណុចដែលមានចម្ងាយថេរ r ពីផ្ចិត។ ចម្ងាយពីចំណុចទៅប្លង់ត្រូវវាស់តាមទិសកែង។" },
        formula: ["Sphere centre (a, b, c), radius r: (x − a)² + (y − b)² + (z − c)² = r²", "Distance from P(x₀,y₀,z₀) to Ax + By + Cz + D = 0: |Ax₀ + By₀ + Cz₀ + D| / √(A² + B² + C²)"],
        example: { question: { en: "Find the distance from P(1, 2, 3) to the plane x + 2y + 2z − 9 = 0.", km: "ចូររកចម្ងាយពី P(1, 2, 3) ទៅប្លង់ x + 2y + 2z − 9 = 0។" }, steps: [
          { en: "Here A = 1, B = 2, C = 2 and D = −9.", km: "នៅទីនេះ A = 1, B = 2, C = 2 និង D = −9។" },
          { en: "Substitute the point: |1(1) + 2(2) + 2(3) − 9| / √(1² + 2² + 2²).", km: "ជំនួសកូអរដោនេចំណុច៖ |1(1) + 2(2) + 2(3) − 9| / √(1² + 2² + 2²)។" },
          { en: "The numerator is |1 + 4 + 6 − 9| = 2 and the denominator is 3.", km: "ភាគយកគឺ |1 + 4 + 6 − 9| = 2 ហើយភាគបែងគឺ 3។" }
        ], answer: { en: "Distance = 2/3 units.", km: "ចម្ងាយ = 2/3 ឯកតា។" } },
        practice: { question: { en: "Write the equation of a sphere with centre (1, −2, 0) and radius 4.", km: "សរសេរសមីការស្វ៊ែរដែលមានផ្ចិត (1, −2, 0) និងកាំ 4។" }, answer: { en: "(x − 1)² + (y + 2)² + z² = 16", km: "(x − 1)² + (y + 2)² + z² = 16" } }
      }
    ]
  }
];
