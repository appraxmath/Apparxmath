import { MathText } from "@/components/math-text";

type GuideItem = { symbol: string; nameEn: string; meaningEn: string; nameKm: string; meaningKm: string };

const excludedWords = new Set("Two-term Three-term example For any square matrix when det is not cancelled vertical horizontal asymptote Stationary point Rotation by Enlargement scale Reflection in x-axis Sphere centre radius Distance between Circle with Internal division ratio Population variance standard deviation About within If continuous at Line Plane Distance AB from P to and mutually exclusive independent Common position convention Q position maximum minimum radians degrees growth decay increasing decreasing choose correct quadrant non-zero not zero sin cos tan log lim det adj sqrt".toLowerCase().split(/\s+/));

function guideFor(symbol: string, context: string, formula: string): GuideItem {
  const topic = context.toLowerCase();
  const sequence = /sequence|induction|binomial/.test(topic);
  const exponential = /exponential|logarithm|fractional exponent|root/.test(topic);
  const trig = /trigonometric|trigonometry|angle|radian/.test(topic);
  const matrix = /matrix|linear system|transformation/.test(topic);
  const complex = /complex/.test(topic);
  const calculus = /limit|derivative|tangent|variation|rational function/.test(topic);
  const probability = /probability|event/.test(topic);
  const vector = /vector|line|plane|space/.test(topic);
  const guides: Record<string, Omit<GuideItem, "symbol">> = {
    "aₙ": { nameEn: "nth term", meaningEn: "the sequence value at position n", nameKm: "តួទី n", meaningKm: "តម្លៃស្វ៊ីតនៅលំដាប់ n" },
    "a₁": { nameEn: "first term", meaningEn: "the starting value of this sequence", nameKm: "តួទីមួយ", meaningKm: "តម្លៃចាប់ផ្ដើមនៃស្វ៊ីតនេះ" },
    "aₙ₊₁": { nameEn: "next term", meaningEn: "the sequence value immediately after position n", nameKm: "តួបន្ទាប់", meaningKm: "តម្លៃស្វ៊ីតនៅលំដាប់បន្ទាប់ពី n" },
    "aₙ₋₁": { nameEn: "previous term", meaningEn: "the sequence value one position before n", nameKm: "តួមុន", meaningKm: "តម្លៃស្វ៊ីតមួយលំដាប់មុន n" },
    "aₙ₋₂": { nameEn: "term two positions earlier", meaningEn: "the sequence value two positions before n", nameKm: "តួមុនពីរលំដាប់", meaningKm: "តម្លៃស្វ៊ីតពីរលំដាប់មុន n" },
    "Sₙ": { nameEn: "nth partial sum", meaningEn: "the sum of the first n terms", nameKm: "ផលបូក n តួដំបូង", meaningKm: "ផលបូកនៃតួ n ដំបូង" },
    "Σ": { nameEn: "summation sign", meaningEn: "adds the indicated terms over the displayed index range", nameKm: "សញ្ញាផលបូក", meaningKm: "បូកតួតាមចន្លោះលំដាប់ដែលបានបង្ហាញ" },
    "Δ": { nameEn: "first difference", meaningEn: "the change from one sequence term to the next", nameKm: "ផលដកទីមួយ", meaningKm: "បម្រែបម្រួលពីតួស្វ៊ីតមួយទៅតួបន្ទាប់" },
    "a": { nameEn: complex ? "real part" : exponential ? "base" : sequence ? "first term or coefficient" : vector ? "reference point/vector" : matrix ? "matrix entry" : "quantity a", meaningEn: complex ? "the real component of the complex number z" : exponential ? "the fixed base raised to the exponent" : sequence ? "the starting term or coefficient shown in this rule" : vector ? "the fixed point used to locate this line or plane" : matrix ? "the entry labeled a in the displayed matrix relation" : "the quantity assigned to a in this relation" , nameKm: complex ? "ផ្នែកពិត" : exponential ? "គោល" : vector ? "ចំណុច/វ៉ិចទ័រយោង" : matrix ? "ធាតុម៉ាទ្រីស" : "បរិមាណ a", meaningKm: complex ? "សមាសធាតុពិតនៃចំនួនកុំផ្លិច z" : exponential ? "គោលថេរដែលត្រូវលើកជានិទស្សន្ត" : vector ? "ចំណុចថេរដែលប្រើកំណត់ទីតាំងបន្ទាត់ ឬប្លង់នេះ" : matrix ? "ធាតុដែលដាក់ស្លាក a ក្នុងទំនាក់ទំនងម៉ាទ្រីសនេះ" : "បរិមាណដែលតំណាងដោយ a ក្នុងរូបមន្តនេះ" },
    "b": { nameEn: complex ? "imaginary-part coefficient" : /log[_₍]?b/i.test(formula) ? "logarithm base" : trig ? "angle B" : matrix ? "matrix entry" : "coefficient or second quantity", meaningEn: complex ? "the real coefficient multiplying i in z = a + bi" : /log[_₍]?b/i.test(formula) ? "the base of the logarithm in the change-of-base expression" : trig ? "the second angle used in the angle-sum identity" : matrix ? "the entry labeled b in the displayed determinant or matrix" : "the coefficient or quantity paired with a in this relation", nameKm: complex ? "មេគុណផ្នែកនិមិត្ត" : /log[_₍]?b/i.test(formula) ? "គោលលោការីត" : trig ? "មុំ B" : matrix ? "ធាតុម៉ាទ្រីស" : "មេគុណ ឬបរិមាណទីពីរ", meaningKm: complex ? "មេគុណពិតដែលគុណនឹង i ក្នុង z = a + bi" : /log[_₍]?b/i.test(formula) ? "គោលនៃលោការីតក្នុងរូបមន្តប្ដូរគោល" : trig ? "មុំទីពីរដែលប្រើក្នុងរូបមន្តបូកមុំ" : matrix ? "ធាតុដែលដាក់ស្លាក b ក្នុងដេទែរមីណង់ ឬម៉ាទ្រីសនេះ" : "មេគុណ ឬបរិមាណដែលភ្ជាប់ជាមួយ a ក្នុងសមីការនេះ" },
    "n": { nameEn: vector ? "normal vector" : probability ? "number of outcomes" : sequence ? "index or term count" : "index or exponent", meaningEn: vector ? "the vector perpendicular to the plane in its equation" : probability ? "the count of outcomes in the event or sample space shown in parentheses" : sequence ? "the term position or number of terms specified here" : "the index, count, or exponent specified by this formula", nameKm: vector ? "វ៉ិចទ័រណរម៉ាល់" : probability ? "ចំនួនលទ្ធផល" : "សន្ទស្សន៍ ឬចំនួន", meaningKm: vector ? "វ៉ិចទ័រដែលកែងនឹងប្លង់ក្នុងសមីការនេះ" : probability ? "ចំនួនលទ្ធផលក្នុងព្រឹត្តិការណ៍ ឬលំហគំរូក្នុងវង់ក្រចក" : sequence ? "លំដាប់តួ ឬចំនួនតួដែលកំណត់នៅទីនេះ" : "សន្ទស្សន៍ ចំនួន ឬនិទស្សន្តដែលកំណត់ក្នុងរូបមន្តនេះ" },
    "d": { nameEn: sequence ? "common difference" : vector ? "direction vector" : matrix ? "matrix entry" : "differential or coefficient", meaningEn: sequence ? "the fixed amount added between consecutive terms" : vector ? "the vector that gives the line's direction in its vector equation" : matrix ? "the entry labeled d in the displayed matrix" : formula.includes("d/dx") ? "the differential operator used to indicate differentiation with respect to x" : "the fixed coefficient d in the displayed rational expression", nameKm: sequence ? "ផលដករួម" : vector ? "វ៉ិចទ័រទិសដៅ" : matrix ? "ធាតុម៉ាទ្រីស" : "សញ្ញាដេរីវេ ឬមេគុណ", meaningKm: sequence ? "ចំនួនថេរដែលបូករវាងតួជាប់គ្នា" : vector ? "វ៉ិចទ័រដែលកំណត់ទិសដៅបន្ទាត់ក្នុងសមីការវ៉ិចទ័រ" : matrix ? "ធាតុដែលដាក់ស្លាក d ក្នុងម៉ាទ្រីសនេះ" : formula.includes("d/dx") ? "សញ្ញាប្រមាណវិធីដេរីវេតាម x" : "មេគុណថេរ d ក្នុងកន្សោមសនិទានដែលបង្ហាញ" },
    "r": { nameEn: complex ? "modulus" : sequence ? "common ratio" : vector ? "position vector" : "radius or ratio", meaningEn: complex ? "the distance of the complex number from the origin" : sequence ? "the fixed multiplier between consecutive terms" : vector ? "the variable position vector of a point on the line" : "the radius or ratio represented by r in this formula", nameKm: complex ? "ម៉ូឌុល" : sequence ? "ផលធៀបរួម" : vector ? "វ៉ិចទ័រទីតាំង" : "កាំ ឬផលធៀប", meaningKm: complex ? "ចម្ងាយនៃចំនួនកុំផ្លិចពីគល់កូអរដោនេ" : sequence ? "មេគុណថេររវាងតួជាប់គ្នា" : vector ? "វ៉ិចទ័រទីតាំងអថេររបស់ចំណុចលើបន្ទាត់" : "កាំ ឬផលធៀបដែលតំណាងដោយ r ក្នុងរូបមន្តនេះ" },
    "x": { nameEn: "input or variable", meaningEn: calculus ? "the independent input at which the function or derivative is evaluated" : exponential ? "the exponent/input of the function" : "the variable value used in this expression", nameKm: "អថេរ ឬតម្លៃបញ្ចូល", meaningKm: calculus ? "អថេរឯករាជ្យដែលអនុគមន៍ ឬដេរីវេត្រូវបានគណនា" : exponential ? "និទស្សន្ត ឬអថេរបញ្ចូលនៃអនុគមន៍" : "តម្លៃអថេរដែលប្រើក្នុងកន្សោមនេះ" },
    "y": { nameEn: "dependent variable", meaningEn: "the output value paired with x in this relation", nameKm: "អថេរអាស្រ័យ", meaningKm: "តម្លៃលទ្ធផលដែលភ្ជាប់ជាមួយ x ក្នុងទំនាក់ទំនងនេះ" },
    "f": { nameEn: "function", meaningEn: "the rule whose value, limit, or derivative is shown", nameKm: "អនុគមន៍", meaningKm: "ច្បាប់ដែលតម្លៃ លីមីត ឬដេរីវេត្រូវបានបង្ហាញ" },
    "θ": { nameEn: "angle theta", meaningEn: "the angle used as the trigonometric argument", nameKm: "មុំ theta", meaningKm: "មុំដែលប្រើជាអាគុយម៉ង់ត្រីកោណមាត្រ" },
    "A": { nameEn: probability ? "event A" : matrix ? "matrix A" : trig ? "angle A" : "quantity A", meaningEn: probability ? "the event whose probability is being evaluated" : matrix ? "the first matrix in this operation" : trig ? "the first angle in this trigonometric identity" : "the quantity labeled A in this relation", nameKm: probability ? "ព្រឹត្តិការណ៍ A" : matrix ? "ម៉ាទ្រីស A" : trig ? "មុំ A" : "បរិមាណ A", meaningKm: probability ? "ព្រឹត្តិការណ៍ដែលប្រូបាប៊ីលីតេកំពុងគណនា" : matrix ? "ម៉ាទ្រីសទីមួយក្នុងប្រមាណវិធីនេះ" : trig ? "មុំទីមួយក្នុងអត្តសញ្ញាណត្រីកោណមាត្រនេះ" : "បរិមាណដែលដាក់ស្លាក A ក្នុងទំនាក់ទំនងនេះ" },
    "B": { nameEn: probability ? "event B" : matrix ? "matrix B" : trig ? "angle B" : "quantity B", meaningEn: probability ? "the event paired with A in this probability rule" : matrix ? "the second matrix in this operation" : trig ? "the second angle in this trigonometric identity" : "the quantity labeled B in this relation", nameKm: probability ? "ព្រឹត្តិការណ៍ B" : matrix ? "ម៉ាទ្រីស B" : trig ? "មុំ B" : "បរិមាណ B", meaningKm: probability ? "ព្រឹត្តិការណ៍ដែលភ្ជាប់ជាមួយ A ក្នុងច្បាប់ប្រូបាប៊ីលីតេនេះ" : matrix ? "ម៉ាទ្រីសទីពីរក្នុងប្រមាណវិធីនេះ" : trig ? "មុំទីពីរក្នុងអត្តសញ្ញាណត្រីកោណមាត្រនេះ" : "បរិមាណដែលដាក់ស្លាក B ក្នុងទំនាក់ទំនងនេះ" },
    "P": { nameEn: "probability", meaningEn: "the probability assigned to the event in parentheses", nameKm: "ប្រូបាប៊ីលីតេ", meaningKm: "ប្រូបាប៊ីលីតេដែលកំណត់ឱ្យព្រឹត្តិការណ៍ក្នុងវង់ក្រចក" },
    "C": { nameEn: "binomial coefficient", meaningEn: "the number of ways to choose k items from n in the expansion", nameKm: "មេគុណទ្វេធា", meaningKm: "ចំនួនវិធីជ្រើស k ធាតុពី n ធាតុក្នុងការពន្លាត" },
    "S": { nameEn: "sample space", meaningEn: "the full set of outcomes used as the denominator in this probability", nameKm: "លំហគំរូ", meaningKm: "សំណុំលទ្ធផលទាំងអស់ដែលប្រើជាភាគបែងក្នុងប្រូបាប៊ីលីតេនេះ" },
    "μ": { nameEn: "population mean", meaningEn: "the centre/average used to measure deviations", nameKm: "មធ្យមភាគប្រជាជន", meaningKm: "តម្លៃកណ្ដាលដែលប្រើវាស់គម្លាត" },
    "σ": { nameEn: "standard deviation", meaningEn: "the population spread used to scale deviations", nameKm: "គម្លាតស្តង់ដារ", meaningKm: "ការបែកខ្ចាត់ខ្ចាយរបស់ប្រជាជនដែលប្រើធ្វើមាត្រដ្ឋានគម្លាត" },
    "i": { nameEn: "imaginary unit or index", meaningEn: complex ? "the unit satisfying i² = −1" : "the index identifying an item in the sum", nameKm: complex ? "ឯកតានិមិត្ត" : "សន្ទស្សន៍", meaningKm: complex ? "ឯកតាដែលបំពេញ i² = −1" : "សន្ទស្សន៍សម្គាល់ធាតុក្នុងផលបូក" },
    "k": { nameEn: "index or integer parameter", meaningEn: "the running index or integer value specified by this formula", nameKm: "សន្ទស្សន៍ ឬប៉ារ៉ាម៉ែត្រចំនួនគត់", meaningKm: "សន្ទស្សន៍រាប់ ឬតម្លៃចំនួនគត់ដែលរូបមន្តនេះកំណត់" },
    "m": { nameEn: sequence ? "number of terms" : "numerator or ratio part", meaningEn: sequence ? "the specified count of sequence terms" : "the numerator in the fractional exponent or the first part of the stated ratio", nameKm: sequence ? "ចំនួនតួ" : "ភាគយក ឬផ្នែកនៃផលធៀប", meaningKm: sequence ? "ចំនួនតួស្វ៊ីតដែលបានកំណត់" : "ភាគយកនៃនិទស្សន្តប្រភាគ ឬផ្នែកទីមួយនៃផលធៀបដែលបានបង្ហាញ" },
    "p": { nameEn: matrix ? "column count" : "parameter p", meaningEn: matrix ? "the number of columns in the product matrix order" : "the quantity denoted by p in this relation", nameKm: matrix ? "ចំនួនជួរឈរ" : "ប៉ារ៉ាម៉ែត្រ p", meaningKm: matrix ? "ចំនួនជួរឈរនៃលំដាប់ម៉ាទ្រីសផលគុណ" : "បរិមាណដែលតំណាងដោយ p ក្នុងទំនាក់ទំនងនេះ" },
    "c": { nameEn: matrix ? "matrix entry" : "constant", meaningEn: matrix ? "the entry labeled c in the displayed matrix determinant" : "the fixed value denoted by c in this rule", nameKm: matrix ? "ធាតុម៉ាទ្រីស" : "ចំនួនថេរ", meaningKm: matrix ? "ធាតុដែលដាក់ស្លាក c ក្នុងដេទែរមីណង់ម៉ាទ្រីសនេះ" : "តម្លៃថេរដែលតំណាងដោយ c ក្នុងច្បាប់នេះ" },
    "u": { nameEn: vector ? "vector u" : "function or quantity u", meaningEn: vector ? "the first vector whose components/inner product are used" : "the quantity denoted by u in this relation", nameKm: vector ? "វ៉ិចទ័រ u" : "អនុគមន៍ ឬបរិមាណ u", meaningKm: vector ? "វ៉ិចទ័រទីមួយដែលសមាសធាតុ ឬផលគុណស្កាឡាប្រើប្រាស់" : "បរិមាណដែលតំណាងដោយ u ក្នុងទំនាក់ទំនងនេះ" },
    "v": { nameEn: vector ? "vector v" : "function or quantity v", meaningEn: vector ? "the second vector paired with u" : "the quantity denoted by v in this relation", nameKm: vector ? "វ៉ិចទ័រ v" : "អនុគមន៍ ឬបរិមាណ v", meaningKm: vector ? "វ៉ិចទ័រទីពីរដែលផ្គូផ្គងជាមួយ u" : "បរិមាណដែលតំណាងដោយ v ក្នុងទំនាក់ទំនងនេះ" },
    "z": { nameEn: complex ? "complex number" : "variable", meaningEn: complex ? "the complex quantity represented by real and imaginary parts" : "the variable denoted by z in this relation", nameKm: complex ? "ចំនួនកុំផ្លិច" : "អថេរ", meaningKm: complex ? "បរិមាណកុំផ្លិចដែលមានផ្នែកពិត និងនិមិត្ត" : "អថេរដែលតំណាងដោយ z ក្នុងទំនាក់ទំនងនេះ" },
    "e": { nameEn: matrix ? "matrix entry" : "quantity e", meaningEn: matrix ? "the matrix entry labeled e in the displayed 3×3 determinant" : "the quantity denoted by e in this relation", nameKm: matrix ? "ធាតុម៉ាទ្រីស" : "បរិមាណ e", meaningKm: matrix ? "ធាតុម៉ាទ្រីសដែលដាក់ស្លាក e ក្នុងដេទែរមីណង់ 3×3" : "បរិមាណដែលតំណាងដោយ e ក្នុងទំនាក់ទំនងនេះ" },
    "h": { nameEn: matrix ? "matrix entry" : "quantity h", meaningEn: matrix ? "the matrix entry labeled h in the displayed 3×3 determinant" : "the quantity denoted by h in this relation", nameKm: matrix ? "ធាតុម៉ាទ្រីស" : "បរិមាណ h", meaningKm: matrix ? "ធាតុម៉ាទ្រីសដែលដាក់ស្លាក h ក្នុងដេទែរមីណង់ 3×3" : "បរិមាណដែលតំណាងដោយ h ក្នុងទំនាក់ទំនងនេះ" },
    "w": { nameEn: "complex root", meaningEn: "the kth root listed by the root formula", nameKm: "ឫសកុំផ្លិច", meaningKm: "ឫសទី k ដែលបានរាយក្នុងរូបមន្តឫសនេះ" },
    "L": { nameEn: "limit value", meaningEn: "the value approached by f(x) as x approaches a", nameKm: "តម្លៃលីមីត", meaningKm: "តម្លៃដែល f(x) ខិតទៅជិត នៅពេល x ខិតទៅជិត a" },
    "N": { nameEn: "population size", meaningEn: "the total number of observations used in the population variance", nameKm: "ទំហំប្រជាជន", meaningKm: "ចំនួនទិន្នន័យសរុបដែលប្រើក្នុងវ៉ារ្យង់ប្រជាជន" },
    "Q": { nameEn: "quartile", meaningEn: "the requested quartile at the position indicated by its subscript", nameKm: "ក្វាតីល", meaningKm: "ក្វាតីលដែលត្រូវការនៅលំដាប់ដែលសន្ទស្សន៍បញ្ជាក់" },
    "t": { nameEn: "parameter", meaningEn: "the scalar parameter that moves along the line", nameKm: "ប៉ារ៉ាម៉ែត្រ", meaningKm: "មាត្រដ្ឋានប៉ារ៉ាម៉ែត្រដែលកំណត់ទីតាំងលើបន្ទាត់" },
    "ℤ": { nameEn: "integers", meaningEn: "the set from which k may be any integer", nameKm: "សំណុំចំនួនគត់", meaningKm: "សំណុំដែល k អាចជាចំនួនគត់ណាមួយ" }
  };
  if (symbol === "log") return { symbol, nameEn: "logarithm", meaningEn: "the logarithm operation with the displayed base and argument", nameKm: "លោការីត", meaningKm: "ប្រមាណវិធីលោការីតដែលមានគោល និងអាគុយម៉ង់ដូចបានបង្ហាញ" };
  if (symbol === "sin" || symbol === "cos" || symbol === "tan") return { symbol, nameEn: symbol === "sin" ? "sine" : symbol === "cos" ? "cosine" : "tangent", meaningEn: `the trigonometric function of the angle shown in this formula`, nameKm: symbol === "sin" ? "ស៊ីនុស" : symbol === "cos" ? "កូស៊ីនុស" : "តង់សង់", meaningKm: "អនុគមន៍ត្រីកោណមាត្រនៃមុំដែលបង្ហាញក្នុងរូបមន្តនេះ" };
  if (symbol === "det") return { symbol, nameEn: "determinant", meaningEn: "the scalar determinant of the displayed square matrix", nameKm: "ដេទើមីណង់", meaningKm: "តម្លៃស្កាឡានៃម៉ាទ្រីសការ៉េដែលបានបង្ហាញ" };
  if (symbol === "π") return { symbol, nameEn: "pi", meaningEn: "the constant used for angle measure and circle relationships", nameKm: "ពី", meaningKm: "ចំនួនថេរដែលប្រើក្នុងរង្វាស់មុំ និងទំនាក់ទំនងរង្វង់" };
  if (symbol === "°") return { symbol, nameEn: "degree", meaningEn: "the unit used for the angle measure on the left side", nameKm: "ដឺក្រេ", meaningKm: "ឯកតារង្វាស់មុំដែលប្រើនៅខាងឆ្វេង" };
  if (symbol === "degrees") return { symbol, nameEn: "degree measure", meaningEn: "the angle expressed in degrees before conversion to radians", nameKm: "រង្វាស់ដឺក្រេ", meaningKm: "មុំដែលសរសេរជាដឺក្រេមុនបម្លែងទៅរ៉ាដ្យង់" };
  if (symbol === "radians") return { symbol, nameEn: "radian measure", meaningEn: "the angle expressed in radians after conversion", nameKm: "រង្វាស់រ៉ាដ្យង់", meaningKm: "មុំដែលសរសេរជារ៉ាដ្យង់បន្ទាប់ពីបម្លែង" };
  const found = guides[symbol];
  if (found) return { symbol, ...found };
  if (/^[a-z].*[₀₁₂₃₄₅₆₇₈₉₊₋₌ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ]/.test(symbol)) return { symbol, nameEn: complex ? "indexed complex number" : "indexed quantity", meaningEn: complex ? `the complex number at the point index shown in ${symbol}` : `the value of ${symbol[0]} at the position shown by its subscript in this formula`, nameKm: complex ? "ចំនួនកុំផ្លិចមានសន្ទស្សន៍" : "បរិមាណមានសន្ទស្សន៍", meaningKm: complex ? `ចំនួនកុំផ្លិចនៅសន្ទស្សន៍ចំណុចដែលបង្ហាញក្នុង ${symbol}` : `តម្លៃ ${symbol[0]} នៅលំដាប់ដែលសន្ទស្សន៍ខាងក្រោមបង្ហាញក្នុងរូបមន្តនេះ` };
  if (/^[a-z]$/.test(symbol)) return { symbol, nameEn: "formula variable", meaningEn: `the quantity represented by ${symbol} in this relationship`, nameKm: "អថេរក្នុងរូបមន្ត", meaningKm: `បរិមាណដែលតំណាងដោយ ${symbol} ក្នុងទំនាក់ទំនងនេះ` };
  return { symbol, nameEn: "mathematical quantity", meaningEn: `the quantity denoted by ${symbol} in this formula`, nameKm: "បរិមាណគណិតវិទ្យា", meaningKm: `បរិមាណដែលតំណាងដោយ ${symbol} ក្នុងរូបមន្តនេះ` };
}

function symbolsIn(formula: string): string[] {
  const cleaned = formula.replace(/\b(?:sin|cos|tan|log|lim|det|adj|sqrt)\b/gi, " ");
  const subscriptChars = "₀₁₂₃₄₅₆₇₈₉₊₋₌ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ";
  const indexedPattern = new RegExp(`[A-Za-z][${subscriptChars}]+`, "g");
  const indexed = cleaned.match(indexedPattern) ?? [];
  let remaining = cleaned.replace(indexedPattern, " ");
  remaining = remaining.replace(/\b(?:range|maximum|minimum|degrees|radians|example|rotation|enlargement|reflection|sphere|distance|circle|internal|division|ratio|population|variance|deviation|stationary|point|line|plane|centre|radius|within|continuous|cancelled|vertical|horizontal|asymptote|mutually|exclusive|independent|common|position|convention|about|when|not|from|with|between|three|two|term|for|any|square|matrix|and|the|is|if|by|in|to|of|on|an|growth|decay|increasing|decreasing)\b/gi, " ");
  const words = remaining.match(/[A-Za-zΑ-Ωα-ω]+/g) ?? [];
  const singles = words.filter((value) => !excludedWords.has(value.toLowerCase()));
  const symbols = [...indexed, ...singles];
  if (formula.includes("°")) symbols.push("°");
  if (/\bdegrees\b/i.test(formula)) symbols.push("degrees");
  if (/\bradians\b/i.test(formula)) symbols.push("radians");
  for (const operator of ["sin", "cos", "tan", "log", "det"]) if (new RegExp(`\\b${operator}\\b`, "i").test(formula)) symbols.push(operator);
  const superscriptNames: Record<string, string> = { "ᵃ": "a", "ᵇ": "b", "ᶜ": "c", "ᵈ": "d", "ᵉ": "e", "ᶠ": "f", "ᵍ": "g", "ʰ": "h", "ⁱ": "i", "ʲ": "j", "ᵏ": "k", "ˡ": "l", "ᵐ": "m", "ⁿ": "n", "ᵒ": "o", "ᵖ": "p", "ʳ": "r", "ˢ": "s", "ᵗ": "t", "ᵘ": "u", "ᵛ": "v", "ʷ": "w", "ˣ": "x", "ʸ": "y", "ᶻ": "z" };
  for (const [superscript, plain] of Object.entries(superscriptNames)) if (formula.includes(superscript)) symbols.push(plain);
  if (/logₐ/i.test(formula)) symbols.push("a");
  if (/log₍?b/i.test(formula)) symbols.push("b");
  if (/[ⁿ]/.test(formula)) symbols.push("n");
  if (/[ⁱ]/.test(formula)) symbols.push("i");
  return [...new Set(symbols.filter((value) => !excludedWords.has(value.toLowerCase())))];
}

export function FormulaCard({ formula, context }: { formula: string; context: string }) {
  const guides = symbolsIn(formula).map((symbol) => guideFor(symbol, context, formula));
  return (
    <article className="formula-card">
      <div className="formula-card__math" aria-label={`Formula: ${formula}`}>
        <MathText className="formula-card__expression" text={formula} />
      </div>
      <div className="formula-card__guide" aria-label="Symbol guide / ការពន្យល់និមិត្តសញ្ញា">
        <h5 className="formula-card__heading">Symbols / និមិត្តសញ្ញា</h5>
        {guides.length ? <ul>{guides.map((item) => <li key={item.symbol}>
          <strong className="formula-card__symbol"><MathText text={item.symbol} /></strong>
          <span><b>{item.nameEn}:</b> {item.meaningEn}<br /><span lang="km"><b>{item.nameKm}៖</b> {item.meaningKm}</span></span>
        </li>)}</ul> : <p className="formula-card__note">The expression contains numerical values and operations only. / កន្សោមនេះមានតែតម្លៃលេខ និងប្រមាណវិធី។</p>}
      </div>
    </article>
  );
}
