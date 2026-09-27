import type { FormatId, SectionId } from './site';

// Demo content: all companies, people and events are fictional.
// Replace with real stories or connect a CMS.

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'quote'; text: string; by: string }
  | { type: 'qa'; q: string; a: string };

export interface Author {
  name: string;
  role: string;
}

export interface Post {
  id: string;
  section: SectionId;
  format: FormatId;
  title: string;
  lead: string;
  author: Author;
  hoursAgo: number;
  readMinutes: number;
  views: number;
  likes: number;
  comments: number;
  body: Block[];
}

const EDITORIAL: Author = { name: 'Asme Newsroom', role: 'News desk' };
const ANNA: Author = { name: 'Anna Sokolova', role: 'AI correspondent' };
const ILYA: Author = { name: 'Ilya Veres', role: 'Fintech editor' };
const MARIA: Author = { name: 'Maria Lapteva', role: 'Tech reporter' };

export const POSTS: Post[] = [
  {
    id: 'open-models-code',
    section: 'ai',
    format: 'news',
    title: 'Open models close the gap with closed ones on coding tasks',
    lead: 'A new head-to-head benchmark shows the difference between open-source and commercial models at code generation has shrunk to a few percentage points.',
    author: EDITORIAL,
    hoursAgo: 0.6,
    readMinutes: 3,
    views: 4200,
    likes: 186,
    comments: 41,
    body: [
      { type: 'p', text: 'An independent research group has published results comparing twelve language models on 1,800 practical tasks: fixing bugs, writing tests and refactoring legacy code.' },
      { type: 'p', text: 'The best open model solved 71% of the tasks, while the leading closed model solved 76%. A year ago the gap on a similar set was around twenty points.' },
      { type: 'h', text: 'Why it matters' },
      { type: 'p', text: 'For companies, it means coding assistants can run inside their own infrastructure without sending source code to outside providers. That matters most for banks and the public sector.' },
      { type: 'p', text: 'The authors note that closed models still do noticeably better with long context and with tasks that require keeping the structure of a whole repository in mind.' },
    ],
  },
  {
    id: 'paylane-interview',
    section: 'fintech',
    format: 'interview',
    title: '“The bank of the future is an API”: Paylane’s founder on payment infrastructure for marketplaces',
    lead: 'We spoke with Mikhail Orlov about building a payment layer from scratch, surviving next to big banks, and where AI actually works in fintech.',
    author: ILYA,
    hoursAgo: 3,
    readMinutes: 12,
    views: 9800,
    likes: 412,
    comments: 87,
    body: [
      { type: 'p', text: 'For three years Paylane has been building payment infrastructure for marketplaces and platforms with thousands of sellers. We sat down with founder Mikhail Orlov to talk about how the market has changed.' },
      { type: 'qa', q: 'Why build your own payment layer instead of using a bank’s ready-made product?', a: 'Bank products are designed for a single merchant. A marketplace has to split one payment between hundreds of recipients, hold back commissions and issue partial refunds. When we started, people were duct-taping that together.' },
      { type: 'qa', q: 'Isn’t it risky to compete with the big banks?', a: 'We don’t compete with them, we’re their customers. The bank brings the license and the money, we bring the product and the speed. A good bank of the future is an API that companies like ours build services on top of.' },
      { type: 'quote', text: 'AI is useful in fintech wherever the work is boring: reconciling payments, parsing receipts, first-line support.', by: 'Mikhail Orlov' },
      { type: 'qa', q: 'Where do you use AI today?', a: 'In fraud prevention and reconciliation. A model flags suspicious chains of transactions and an analyst reviews them. Time to review one case went from forty minutes to eight.' },
    ],
  },
  {
    id: 'tech-frontier-recap',
    section: 'tech',
    format: 'recap',
    title: 'Tech Frontier 2026 recap: the five big ideas from the conference',
    lead: 'Two days, 40 talks and one recurring theme: infrastructure is the most interesting part of tech again. Here is what mattered.',
    author: MARIA,
    hoursAgo: 7,
    readMinutes: 8,
    views: 6100,
    likes: 238,
    comments: 29,
    body: [
      { type: 'p', text: 'Tech Frontier brought together about three thousand engineers, product people and investors. We attended the key sessions and picked the five ideas we heard most often.' },
      { type: 'h', text: '1. Compute is moving closer to the user' },
      { type: 'p', text: 'Speakers agreed that the next wave of products will run on the device: faster, cheaper and without sending data to the cloud.' },
      { type: 'h', text: '2. Energy is the new bottleneck' },
      { type: 'p', text: 'Data centers are limited less by chips than by the power the grid can supply. Several talks were devoted entirely to cooling and energy efficiency.' },
      { type: 'h', text: '3. Fewer platforms, more integrations' },
      { type: 'p', text: 'Startups are building “yet another platform” less often and thin layers on top of existing systems more often. Investors on the closing panel called it the trend of the year.' },
    ],
  },
  {
    id: 'doc-assistants-review',
    section: 'ai',
    format: 'review',
    title: 'AI assistants for documents, reviewed: we tested them on real work',
    lead: 'We ran five services through contracts, reports and spreadsheets, scoring accuracy, long-file handling and monthly price.',
    author: ANNA,
    hoursAgo: 11,
    readMinutes: 10,
    views: 12400,
    likes: 530,
    comments: 112,
    body: [
      { type: 'p', text: 'AI document assistants promise to save hours of reading contracts and reports. We wanted to see how true that is.' },
      { type: 'h', text: 'How we tested' },
      { type: 'p', text: 'Every service got the same set: a 40-page lease, a company’s annual report and a spreadsheet with three years of sales. The questions were written by a lawyer and a financial analyst.' },
      { type: 'h', text: 'What we found' },
      { type: 'p', text: 'All five assistants summarize documents confidently, but they differ on details. Two mixed up clause numbers in the contract, and one couldn’t handle a table longer than 10,000 rows.' },
      { type: 'p', text: 'The takeaway: assistants are good for a first read, but important documents still need a final human check.' },
    ],
  },
  {
    id: 'ai-scoring-rules',
    section: 'fintech',
    format: 'news',
    title: 'Banks and regulators discuss common rules for AI credit scoring',
    lead: 'Industry members propose requiring lenders to explain the reasons for a rejection whenever a model made the decision.',
    author: ILYA,
    hoursAgo: 14,
    readMinutes: 4,
    views: 5300,
    likes: 144,
    comments: 63,
    body: [
      { type: 'p', text: 'A working group of bank and regulator representatives has drafted requirements for using machine learning in lending decisions.' },
      { type: 'p', text: 'The key proposal is a customer’s right to a clear explanation of a rejection. Today many banks stop at “the decision was made according to internal criteria.”' },
      { type: 'quote', text: 'A model can be as accurate as you like, but the customer has to understand what to do to get approved next time.', by: 'working group member' },
      { type: 'p', text: 'Discussion of the draft will continue until the end of the year. After that, the document may become the basis for binding guidance.' },
    ],
  },
  {
    id: 'on-device-ai',
    section: 'tech',
    format: 'news',
    title: 'Phone makers are moving AI onto the device. Here is what changes for users',
    lead: 'Translation, speech recognition and photo processing increasingly work offline. We look at why the industry is betting on it.',
    author: MARIA,
    hoursAgo: 20,
    readMinutes: 5,
    views: 7700,
    likes: 201,
    comments: 38,
    body: [
      { type: 'p', text: 'More and more AI features in new smartphones run directly on the device. Manufacturers are adding memory and more powerful neural processors to fit models on the phone.' },
      { type: 'h', text: 'Why it matters' },
      { type: 'p', text: 'First, speed: responses no longer depend on the connection. Second, privacy: photos and voice don’t leave the phone. Third, economics: cloud compute for hundreds of millions of users is expensive.' },
      { type: 'p', text: 'The one limit for now is model size. Devices run compact versions, and harder tasks still go to the cloud.' },
    ],
  },
  {
    id: 'agents-interview',
    section: 'ai',
    format: 'interview',
    title: '“Agents will replace interfaces, not people”: an AI researcher on what comes next',
    lead: 'Elena Gromova has studied autonomous agents for five years. We asked her what already works, what is overhyped and how everyday apps will change.',
    author: ANNA,
    hoursAgo: 28,
    readMinutes: 14,
    views: 15200,
    likes: 688,
    comments: 154,
    body: [
      { type: 'p', text: 'Elena Gromova leads a research group that studies how AI agents carry out multi-step tasks. We talked about the hype, real deployments and the future of interfaces.' },
      { type: 'qa', q: 'What is an AI agent, in plain words?', a: 'It’s a program you give a goal rather than a command. Not “open the spreadsheet” but “prepare the quarterly sales report.” From there it decides which steps are needed.' },
      { type: 'qa', q: 'Where do agents really work today?', a: 'In software development, support and analytics. The tasks there are well defined and the results are easy to check.' },
      { type: 'quote', text: 'In a few years we will open apps less often and simply say what needs to be done.', by: 'Elena Gromova' },
      { type: 'qa', q: 'What is overhyped?', a: 'The idea that an agent fully replaces an employee. It replaces the routine part of the job, but responsibility and final decisions stay with people.' },
    ],
  },
  {
    id: 'neobanks-review',
    section: 'fintech',
    format: 'review',
    title: 'Neobanks for freelancers, reviewed: fees, limits and app quality',
    lead: 'We opened accounts at four digital banks and took client payments through them for a month. Here is which ones are cheaper and easier to use.',
    author: ILYA,
    hoursAgo: 44,
    readMinutes: 9,
    views: 8900,
    likes: 356,
    comments: 92,
    body: [
      { type: 'p', text: 'Freelancers care about three things: getting paid fast, not losing money to fees and not spending time on bookkeeping. Those were our criteria.' },
      { type: 'h', text: 'Fees' },
      { type: 'p', text: 'The spread was wide: from free accounts with transfer limits to a flat subscription that only pays off at high volumes.' },
      { type: 'h', text: 'Apps' },
      { type: 'p', text: 'The banks that automatically set money aside for taxes and generate an invoice for the client did best. That saves a couple of hours a month.' },
      { type: 'p', text: 'The full table with plans and our scores is at the end of the story.' },
    ],
  },
  {
    id: 'ai-builders-recap',
    section: 'ai',
    format: 'recap',
    title: 'AI Builders meetup recap: how teams ship language models in their products',
    lead: 'Four talks from product teams, with numbers and mistakes instead of marketing. The main lessons worth taking home.',
    author: ANNA,
    hoursAgo: 60,
    readMinutes: 7,
    views: 3900,
    likes: 172,
    comments: 24,
    body: [
      { type: 'p', text: 'The AI Builders meetup brings together teams that have already launched products on language models. The format is simple: a 20-minute talk and 20 minutes of questions.' },
      { type: 'h', text: 'Start with evaluation' },
      { type: 'p', text: 'Every speaker said the same thing: first build a set of test cases and metrics, then pick a model. Without that you can’t tell whether things got better or worse.' },
      { type: 'h', text: 'Costs creep up quietly' },
      { type: 'p', text: 'One team described how their API bill tripled in a month because of long prompts. The fix was caching and smaller models for simple requests.' },
    ],
  },
  {
    id: 'local-ai-laptops',
    section: 'tech',
    format: 'review',
    title: 'How to choose a laptop for running AI models locally in 2026',
    lead: 'Memory, GPU, cooling: which specs to look at if you want to run models on your own machine instead of the cloud.',
    author: MARIA,
    hoursAgo: 80,
    readMinutes: 11,
    views: 10300,
    likes: 447,
    comments: 76,
    body: [
      { type: 'p', text: 'Running language models on your own computer is now realistic for ordinary users. But not every laptop can handle it.' },
      { type: 'h', text: 'Memory matters most' },
      { type: 'p', text: 'The model has to fit in memory entirely. 16 GB is enough for compact models; mid-size ones need 32 GB or more. That is the main spec to choose by.' },
      { type: 'h', text: 'Cooling' },
      { type: 'p', text: 'Under load, thin laptops throttle within minutes. If you plan to run long jobs, look for models with active cooling.' },
    ],
  },
];
