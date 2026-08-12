// Sakura Code Assistant — example knowledge base
//
// Each category has:
//   category  – display name
//   mode      – 'live'      : runs directly in the browser via eval
//               'simulated' : needs a real Node/Mongo/API environment,
//                             so a curated expected-output preview is shown
//               'markup'    : HTML/CSS snippet, rendered live in an iframe
//   ext       – file extension used for the editor tab label
//   examples  – array of { title, code, simulated? }

const knowledgeBase = [
  {
    category: 'Basics',
    mode: 'live',
    ext: 'js',
    examples: [
      { title: 'Variables', code: `let x = 10;\nconst y = 20;\nconsole.log(x + y);` },
      { title: 'Data Types', code: `const num = 5;\nconst str = 'Hello';\nconst isTrue = true;\nconsole.log(typeof num, typeof str, typeof isTrue);` },
      { title: 'Template Literals', code: `const name = 'Sakura';\nconst greeting = \`Hello, \${name}! You have \${3 + 4} tasks left.\`;\nconsole.log(greeting);` },
      { title: 'Conditionals', code: `const age = 18;\nif (age >= 18) {\n  console.log('Adult');\n} else {\n  console.log('Minor');\n}` },
      { title: 'Switch Statement', code: `const fruit = 'peach';\nswitch (fruit) {\n  case 'apple':\n    console.log('It is an apple');\n    break;\n  case 'peach':\n    console.log('It is a peach');\n    break;\n  default:\n    console.log('Unknown fruit');\n}` },
      { title: 'Ternary Operator', code: `const score = 85;\nconst result = score >= 60 ? 'Pass' : 'Fail';\nconsole.log(result);` },
    ]
  },
  {
    category: 'Loops',
    mode: 'live',
    ext: 'js',
    examples: [
      { title: 'For Loop', code: `for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}` },
      { title: 'While Loop', code: `let i = 1;\nwhile (i <= 5) {\n  console.log(i);\n  i++;\n}` },
      { title: 'For...of', code: `const colors = ['pink', 'white', 'rose'];\nfor (const color of colors) {\n  console.log(color);\n}` },
      { title: 'For...in', code: `const flower = { name: 'Sakura', color: 'pink' };\nfor (const key in flower) {\n  console.log(key + ': ' + flower[key]);\n}` },
      { title: 'Array.forEach', code: `[1, 2, 3].forEach(n => console.log(n * n));` },
    ]
  },
  {
    category: 'Functions',
    mode: 'live',
    ext: 'js',
    examples: [
      { title: 'Function Declaration', code: `function greet(name) {\n  return 'Hello, ' + name;\n}\nconsole.log(greet('Kanza'));` },
      { title: 'Arrow Function', code: `const sum = (a, b) => a + b;\nconsole.log(sum(3, 4));` },
      { title: 'Default Parameters', code: `function bloom(flower = 'sakura') {\n  return \`The \${flower} is blooming\`;\n}\nconsole.log(bloom());` },
      { title: 'Rest Parameters', code: `function total(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\nconsole.log(total(1, 2, 3, 4));` },
      { title: 'Closures', code: `function counter() {\n  let count = 0;\n  return () => ++count;\n}\nconst tick = counter();\nconsole.log(tick(), tick(), tick());` },
      { title: 'Recursion', code: `function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\nconsole.log(factorial(5));` },
    ]
  },
  {
    category: 'Objects & Arrays',
    mode: 'live',
    ext: 'js',
    examples: [
      { title: 'Object Basics', code: `const person = { name: 'Ali', age: 25 };\nconsole.log(person.name);` },
      { title: 'Destructuring', code: `const flower = { name: 'Sakura', petals: 5 };\nconst { name, petals } = flower;\nconsole.log(name, petals);` },
      { title: 'Spread Operator', code: `const a = { color: 'pink' };\nconst b = { ...a, size: 'small' };\nconsole.log(b);` },
      { title: 'Array.map', code: `const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);` },
      { title: 'Array.filter', code: `const nums = [1, 2, 3, 4, 5, 6];\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log(evens);` },
      { title: 'Array.reduce', code: `const nums = [1, 2, 3, 4];\nconst sum = nums.reduce((acc, n) => acc + n, 0);\nconsole.log(sum);` },
      { title: 'Array.sort', code: `const flowers = ['rose', 'lily', 'sakura'];\nconsole.log(flowers.sort());` },
    ]
  },
  {
    category: 'ES6+',
    mode: 'live',
    ext: 'js',
    examples: [
      { title: 'Classes', code: `class Flower {\n  constructor(name) {\n    this.name = name;\n  }\n  bloom() {\n    return \`\${this.name} is blooming\`;\n  }\n}\nconst sakura = new Flower('Sakura');\nconsole.log(sakura.bloom());` },
      { title: 'Class Inheritance', code: `class Plant {\n  grow() { return 'growing'; }\n}\nclass Tree extends Plant {\n  grow() { return super.grow() + ' into a tree'; }\n}\nconsole.log(new Tree().grow());` },
      { title: 'Map & Set', code: `const petalCounts = new Map();\npetalCounts.set('sakura', 5);\npetalCounts.set('lily', 6);\nconsole.log([...petalCounts.entries()]);` },
      { title: 'Optional Chaining', code: `const garden = { flower: { name: 'Sakura' } };\nconsole.log(garden.flower?.name);\nconsole.log(garden.tree?.name);` },
      { title: 'Nullish Coalescing', code: `const petals = 0;\nconsole.log(petals ?? 'default'); // 0, since 0 is not null/undefined` },
    ]
  },
  {
    category: 'Async / Await',
    mode: 'live',
    ext: 'js',
    examples: [
      { title: 'Promise Basics', code: `const bloom = new Promise((resolve) => {\n  resolve('bloomed');\n});\nbloom.then(result => console.log(result));` },
      { title: 'Async/Await', code: `function wait(ms) {\n  return new Promise(res => setTimeout(res, ms));\n}\nasync function main() {\n  console.log('waiting...');\n  await wait(100);\n  console.log('done');\n}\nmain();` },
      { title: 'Promise.all', code: `const p1 = Promise.resolve('sakura');\nconst p2 = Promise.resolve('lily');\nPromise.all([p1, p2]).then(results => console.log(results));` },
    ]
  },
  {
    category: 'Error Handling',
    mode: 'live',
    ext: 'js',
    examples: [
      { title: 'Try/Catch', code: `try {\n  JSON.parse('not valid json');\n} catch (err) {\n  console.log('Caught error:', err.message);\n}` },
      { title: 'Custom Errors', code: `class GardenError extends Error {\n  constructor(msg) {\n    super(msg);\n    this.name = 'GardenError';\n  }\n}\ntry {\n  throw new GardenError('No petals left');\n} catch (e) {\n  console.log(e.name + ': ' + e.message);\n}` },
      { title: 'Finally Block', code: `try {\n  console.log('watering...');\n  throw new Error('drought');\n} catch (e) {\n  console.log('caught: ' + e.message);\n} finally {\n  console.log('this always runs');\n}` },
    ]
  },
  {
    category: 'Regex',
    mode: 'live',
    ext: 'js',
    examples: [
      { title: 'Test a Pattern', code: `const re = /^[a-z]+$/i;\nconsole.log(re.test('Sakura'));` },
      { title: 'Replace with Regex', code: `const str = 'pink pink pink';\nconsole.log(str.replace(/pink/g, 'rose'));` },
      { title: 'Match Emails', code: `const text = 'contact: hana@garden.com';\nconst match = text.match(/[\\w.-]+@[\\w.-]+\\.\\w+/);\nconsole.log(match[0]);` },
    ]
  },
  {
    category: 'Node.js',
    mode: 'simulated',
    ext: 'js',
    examples: [
      {
        title: 'HTTP Server',
        code: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('Hello from the server');\n});\n\nserver.listen(3000, () => {\n  console.log('Server running on port 3000');\n});`,
        simulated: `Server running on port 3000\n> GET / 200 OK\n"Hello from the server"`
      },
      {
        title: 'File System (fs)',
        code: `const fs = require('fs');\n\nfs.writeFileSync('garden.txt', 'Sakura, Lily, Rose');\nconst data = fs.readFileSync('garden.txt', 'utf-8');\nconsole.log(data);`,
        simulated: `Sakura, Lily, Rose`
      },
      {
        title: 'Express Basic Route',
        code: `const express = require('express');\nconst app = express();\n\napp.get('/flowers', (req, res) => {\n  res.json({ name: 'Sakura', color: 'pink' });\n});\n\napp.listen(3000, () => console.log('Express server ready'));`,
        simulated: `Express server ready\nGET /flowers -> 200\n{ "name": "Sakura", "color": "pink" }`
      },
      {
        title: 'Environment Variables',
        code: `require('dotenv').config();\n\nconst PORT = process.env.PORT || 3000;\nconsole.log(\`Running on port \${PORT}\`);`,
        simulated: `Running on port 3000`
      },
      {
        title: 'Event Emitter',
        code: `const EventEmitter = require('events');\nconst bloomEmitter = new EventEmitter();\n\nbloomEmitter.on('bloom', (flower) => {\n  console.log(\`\${flower} has bloomed\`);\n});\n\nbloomEmitter.emit('bloom', 'Sakura');`,
        simulated: `Sakura has bloomed`
      },
    ]
  },
  {
    category: 'MongoDB',
    mode: 'simulated',
    ext: 'js',
    examples: [
      {
        title: 'Connect to MongoDB',
        code: `const { MongoClient } = require('mongodb');\n\nconst uri = 'mongodb://localhost:27017';\nconst client = new MongoClient(uri);\n\nasync function connect() {\n  await client.connect();\n  console.log('Connected to MongoDB');\n}\nconnect();`,
        simulated: `Connected to MongoDB`
      },
      {
        title: 'Insert Document',
        code: `const db = client.db('garden');\nconst flowers = db.collection('flowers');\n\nawait flowers.insertOne({ name: 'Sakura', color: 'pink', petals: 5 });\nconsole.log('Document inserted');`,
        simulated: `Document inserted\nInsertedId: 64f1a2b3c4d5e6f7a8b9c0d1`
      },
      {
        title: 'Find Documents',
        code: `const flowers = db.collection('flowers');\nconst pinkFlowers = await flowers.find({ color: 'pink' }).toArray();\nconsole.log(pinkFlowers);`,
        simulated: `[\n  { name: 'Sakura', color: 'pink', petals: 5 },\n  { name: 'Peony', color: 'pink', petals: 8 }\n]`
      },
      {
        title: 'Mongoose Schema',
        code: `const mongoose = require('mongoose');\n\nconst flowerSchema = new mongoose.Schema({\n  name: String,\n  color: String,\n  petals: Number,\n});\n\nconst Flower = mongoose.model('Flower', flowerSchema);\nconst sakura = new Flower({ name: 'Sakura', color: 'pink', petals: 5 });\nawait sakura.save();\nconsole.log('Saved:', sakura.name);`,
        simulated: `Saved: Sakura`
      },
      {
        title: 'Update Document',
        code: `await flowers.updateOne(\n  { name: 'Sakura' },\n  { $set: { petals: 6 } }\n);\nconsole.log('Sakura now has 6 petals');`,
        simulated: `Sakura now has 6 petals\nMatchedCount: 1, ModifiedCount: 1`
      },
      {
        title: 'Aggregation Pipeline',
        code: `const results = await flowers.aggregate([\n  { $match: { color: 'pink' } },\n  { $group: { _id: '$color', totalPetals: { $sum: '$petals' } } }\n]).toArray();\nconsole.log(results);`,
        simulated: `[ { _id: 'pink', totalPetals: 19 } ]`
      },
    ]
  },
  {
    category: 'APIs & Fetch',
    mode: 'simulated',
    ext: 'js',
    examples: [
      {
        title: 'Fetch GET Request',
        code: `fetch('https://api.garden.dev/flowers')\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`,
        simulated: `[ { "name": "Sakura", "petals": 5 }, { "name": "Lily", "petals": 6 } ]`
      },
      {
        title: 'Async Fetch with Error Handling',
        code: `async function getFlowers() {\n  try {\n    const res = await fetch('https://api.garden.dev/flowers');\n    if (!res.ok) throw new Error('Request failed');\n    const data = await res.json();\n    console.log(data);\n  } catch (err) {\n    console.error('Error:', err.message);\n  }\n}\ngetFlowers();`,
        simulated: `{ "name": "Sakura", "petals": 5, "color": "pink" }`
      },
      {
        title: 'POST Request (Axios)',
        code: `const axios = require('axios');\n\nasync function plantFlower() {\n  const res = await axios.post('https://api.garden.dev/flowers', {\n    name: 'Sakura',\n    color: 'pink',\n  });\n  console.log(res.data);\n}\nplantFlower();`,
        simulated: `{ "id": 42, "name": "Sakura", "color": "pink", "created": true }`
      },
      {
        title: 'Express API Route (CRUD)',
        code: `app.get('/api/flowers/:id', async (req, res) => {\n  const flower = await Flower.findById(req.params.id);\n  if (!flower) return res.status(404).json({ error: 'Not found' });\n  res.json(flower);\n});`,
        simulated: `GET /api/flowers/1 -> 200\n{ "id": 1, "name": "Sakura", "petals": 5 }`
      },
      {
        title: 'REST API with Query Params',
        code: `app.get('/api/flowers', (req, res) => {\n  const { color } = req.query;\n  const filtered = flowers.filter(f => f.color === color);\n  res.json(filtered);\n});`,
        simulated: `GET /api/flowers?color=pink -> 200\n[ { "name": "Sakura", "color": "pink" } ]`
      },
    ]
  },
  {
    category: 'HTML',
    mode: 'markup',
    ext: 'html',
    examples: [
      {
        title: 'Basic Structure',
        code: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Welcome to my page</h1>\n    <p>This is a basic HTML document.</p>\n  </body>\n</html>`
      },
      {
        title: 'Semantic Elements',
        code: `<!DOCTYPE html>\n<html>\n<body style="font-family: sans-serif;">\n  <header style="padding:12px;background:#eee;">Site Header</header>\n  <nav style="padding:8px;">Home . About . Contact</nav>\n  <main style="padding:12px;">\n    <article>\n      <h2>Article Title</h2>\n      <p>Semantic tags describe the meaning of content.</p>\n    </article>\n  </main>\n  <footer style="padding:8px;background:#eee;">Site Footer</footer>\n</body>\n</html>`
      },
      {
        title: 'Forms',
        code: `<!DOCTYPE html>\n<html>\n<body style="font-family: sans-serif; padding: 16px;">\n  <form>\n    <label for="name">Name</label><br/>\n    <input id="name" type="text" placeholder="Your name" /><br/><br/>\n    <label for="email">Email</label><br/>\n    <input id="email" type="email" placeholder="you@example.com" /><br/><br/>\n    <button type="submit">Submit</button>\n  </form>\n</body>\n</html>`
      },
      {
        title: 'Lists',
        code: `<!DOCTYPE html>\n<html>\n<body style="font-family: sans-serif; padding: 16px;">\n  <h3>Unordered List</h3>\n  <ul>\n    <li>Sakura</li>\n    <li>Lily</li>\n    <li>Rose</li>\n  </ul>\n  <h3>Ordered List</h3>\n  <ol>\n    <li>Plant seed</li>\n    <li>Water daily</li>\n    <li>Watch it grow</li>\n  </ol>\n</body>\n</html>`
      },
      {
        title: 'Tables',
        code: `<!DOCTYPE html>\n<html>\n<body style="font-family: sans-serif; padding: 16px;">\n  <table border="1" cellpadding="8" style="border-collapse: collapse;">\n    <thead>\n      <tr><th>Flower</th><th>Color</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>Sakura</td><td>Pink</td></tr>\n      <tr><td>Lily</td><td>White</td></tr>\n    </tbody>\n  </table>\n</body>\n</html>`
      },
      {
        title: 'Links & Media Placeholder',
        code: `<!DOCTYPE html>\n<html>\n<body style="font-family: sans-serif; padding: 16px;">\n  <a href="#">This is a link</a>\n  <br/><br/>\n  <div style="width:160px;height:100px;background:#ddd;display:flex;align-items:center;justify-content:center;border-radius:8px;">\n    image placeholder\n  </div>\n</body>\n</html>`
      },
    ]
  },
  {
    category: 'CSS',
    mode: 'markup',
    ext: 'css',
    examples: [
      {
        title: 'Flexbox Layout',
        code: `<!DOCTYPE html>\n<html>\n<head>\n<style>\n  .row { display: flex; gap: 12px; padding: 16px; }\n  .box { flex: 1; height: 60px; background: #e9a7c1; border-radius: 8px; }\n</style>\n</head>\n<body>\n  <div class="row">\n    <div class="box"></div>\n    <div class="box"></div>\n    <div class="box"></div>\n  </div>\n</body>\n</html>`
      },
      {
        title: 'Grid Layout',
        code: `<!DOCTYPE html>\n<html>\n<head>\n<style>\n  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 16px; }\n  .cell { height: 50px; background: #d891b0; border-radius: 6px; }\n</style>\n</head>\n<body>\n  <div class="grid">\n    <div class="cell"></div><div class="cell"></div><div class="cell"></div>\n    <div class="cell"></div><div class="cell"></div><div class="cell"></div>\n  </div>\n</body>\n</html>`
      },
      {
        title: 'Transitions & Hover',
        code: `<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body { padding: 24px; font-family: sans-serif; }\n  button {\n    padding: 10px 20px;\n    background: #d6336c;\n    color: white;\n    border: none;\n    border-radius: 999px;\n    transition: transform 0.2s ease, background 0.2s ease;\n  }\n  button:hover { transform: scale(1.08); background: #b8285a; }\n</style>\n</head>\n<body>\n  <button>Hover me</button>\n</body>\n</html>`
      },
      {
        title: 'Box Shadow & Radius',
        code: `<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body { padding: 24px; background: #fdf2f6; }\n  .card {\n    width: 200px;\n    padding: 20px;\n    background: white;\n    border-radius: 16px;\n    box-shadow: 0 10px 24px rgba(214, 51, 108, 0.25);\n  }\n</style>\n</head>\n<body>\n  <div class="card">A soft, elevated card</div>\n</body>\n</html>`
      },
      {
        title: 'Gradients',
        code: `<!DOCTYPE html>\n<html>\n<head>\n<style>\n  .banner {\n    height: 120px;\n    border-radius: 12px;\n    background: linear-gradient(135deg, #ffb6c9, #d6336c);\n  }\n</style>\n</head>\n<body style="padding:16px;">\n  <div class="banner"></div>\n</body>\n</html>`
      },
      {
        title: 'Keyframe Animation',
        code: `<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body { padding: 40px; }\n  .dot {\n    width: 40px; height: 40px; border-radius: 50%;\n    background: #d6336c;\n    animation: bounce 1s ease-in-out infinite;\n  }\n  @keyframes bounce {\n    0%, 100% { transform: translateY(0); }\n    50% { transform: translateY(-24px); }\n  }\n</style>\n</head>\n<body>\n  <div class="dot"></div>\n</body>\n</html>`
      },
      {
        title: 'Custom Properties (Variables)',
        code: `<!DOCTYPE html>\n<html>\n<head>\n<style>\n  :root { --accent: #d6336c; --radius: 14px; }\n  .pill {\n    display: inline-block;\n    padding: 10px 18px;\n    color: white;\n    background: var(--accent);\n    border-radius: var(--radius);\n    font-family: sans-serif;\n  }\n</style>\n</head>\n<body style="padding:20px;">\n  <span class="pill">Themed with variables</span>\n</body>\n</html>`
      },
      {
        title: 'Pseudo-elements',
        code: `<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body { padding: 30px; font-family: sans-serif; }\n  .quote { position: relative; padding-left: 20px; color: #6b2545; }\n  .quote::before {\n    content: '"';\n    font-size: 2rem;\n    color: #d6336c;\n    position: absolute;\n    left: 0;\n    top: -8px;\n  }\n</style>\n</head>\n<body>\n  <p class="quote">Good design is smooth and quiet.</p>\n</body>\n</html>`
      },
    ]
  },
  {
    category: 'Challenges',
    mode: 'live',
    ext: 'js',
    examples: [
      { title: 'Reverse String', code: `const str = 'hello';\nconsole.log(str.split('').reverse().join(''));` },
      { title: 'Palindrome Check', code: `function isPalindrome(str) {\n  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return clean === clean.split('').reverse().join('');\n}\nconsole.log(isPalindrome('A man a plan a canal Panama'));` },
      { title: 'FizzBuzz', code: `for (let i = 1; i <= 15; i++) {\n  if (i % 15 === 0) console.log('FizzBuzz');\n  else if (i % 3 === 0) console.log('Fizz');\n  else if (i % 5 === 0) console.log('Buzz');\n  else console.log(i);\n}` },
      { title: 'Find Duplicates', code: `const arr = [1, 2, 3, 2, 4, 1];\nconst dupes = arr.filter((n, i) => arr.indexOf(n) !== i);\nconsole.log([...new Set(dupes)]);` },
      { title: 'Debounce Function', code: `function debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\nconst log = debounce(() => console.log('debounced call'), 200);\nlog();` },
    ]
  }
];

export default knowledgeBase;
