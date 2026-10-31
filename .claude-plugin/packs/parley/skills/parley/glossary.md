# Parley glossary

- [People and programs](#people-and-programs): who and what takes part: agent, reviewer, server,
  listener.
- [Files and versions](#files-and-versions): the document, the page, the static page, the markdown
  export, the answers file and revisions.
- [What a document holds](#what-a-document-holds): blocks, items, the reading column, the contents
  and sections.
- [Questions](#questions): questions, answer styles, options, answers, notes, asks back and their
  states.
- [Comments and threads](#comments-and-threads): comments, drafts, sends, threads and replies.
- [Rounds and the verdict](#rounds-and-the-verdict): rounds, finishing a review, the verdict and new
  rounds.

This file gives each parley idea one name. The page, the CLI, the skill text, the README and the
JSON are to use these names.

**Not all of these names are in the code yet.** Until they are, the code, `check` and the
examples use some old names: for example question `kind`. Write documents with the names `check`
accepts today; `parley schema` and `parley block <type>` print them.

Each entry gives:

- **Means**: one sentence.
- **Shows as**: where the word appears. Page is a label on the review page. CLI is a flag or a
  line the CLI prints. Document is a field in the document JSON. Answers file is a field in
  `<id>.answers.json`. Prose is the skill text, the README and code comments.
- **Replaces**: old words that now mean this.
- **Not**: words it is easy to mix up with it.

Every entry describes what parley does today, under its new name. The glossary changes names
only, never behaviour.

Renames have no aliases. Parley is alpha, so old answers files and old documents are not
supported: after a rename, the old name is simply gone. The same change updates every example and
test document.

## People and programs

### Agent

- **Means**: the AI session that writes the document, waits for the reviewer and replies.
- **Shows as**: page "Agent" on agent messages; Answers file `replies[].from: agent`; Document
  `author.agent`.
- **Not**: the listener, which is a process the agent starts.

### Reviewer

- **Means**: the person who reads the page, comments, answers questions and gives the verdict.
- **Shows as**: Answers file `replies[].from: reviewer`; prose "the reviewer". The page says "you".

### Server

- **Means**: the local process that `parley serve` starts; it serves pages and writes answers files.
- **Shows as**: CLI `parley serve`; page "saved to server"; prose "the server".
- **Replaces**: servlet. Retired everywhere, including code comments and the package description.
- **Not**: the listener.

### Listener

- **Means**: the agent's `parley answers <id> --wait` or `--notify` process, which tells the agent
  when the reviewer sends something.
- **Shows as**: CLI `--wait`, `--notify`; page status bar "Agent listening" or "No agent listening";
  prose "listener".
- **Not**: the server. A server can run with no listener.

## Files and versions

### Document

- **Means**: the JSON file an agent writes, `<id>.json`, holding blocks and questions.
- **Shows as**: CLI `check <doc.json>`, `render <doc.json>`; prose "document".
- **Replaces**: "doc" in prose (fine in code), and "page" when it meant the JSON.
- **Not**: the page.

### Page

- **Means**: the HTML a document becomes, served by the server or written by
  `render --format html`.
- **Shows as**: CLI `render --out <page.html>`; prose "page" or "review page".
- **Not**: the document. Never call the JSON a page.

### Static page

- **Means**: a page written by `render --format html` and opened with no server; answers stay in
  the browser until exported.
- **Shows as**: page Export; prose "static page".

### Markdown export

- **Means**: the same document written as markdown by `render --format markdown` (or
  `--out <file.md>`), for a PR body or a README.
- **Shows as**: CLI `render --format markdown`; prose "markdown export".
- **Not**: a page. It has no answers, threads or verdict.

### Answers file

- **Means**: `<id>.answers.json` beside the document, where the page saves the reviewer's comments,
  answers and verdict, and the agent's replies land.
- **Shows as**: page Export, "saved to server"; CLI `parley answers <id>`; prose "answers file".
- **Replaces**: sidecar. Retired everywhere, including developer docs and code comments.
- **Not**: an answer. One answers file holds every answer for one document.

### Revision

- **Means**: the version number of a document; the agent raises it each time it revises the
  questions.
- **Shows as**: Document `revision`; page "revision 3"; CLI `(revision 3)`.
- **Replaces**: "rewrite" as a noun. The agent revises the document.
- **Not**: round. One round can see several revisions.

### Explanatory document

- **Means**: a document with no questions; finishing it means the reviewer has read it.
- **Shows as**: Document with no `questions` and no `question` blocks; prose "explanatory
  document". The page offers the same verdicts as for any document.

## What a document holds

### Block

- **Means**: one typed part of a document, such as `prose`, `schema` or `diff`.
- **Shows as**: Document `blocks[]`; page block heading (the block `title`); prose "block".
- **Not**: item. A block holds one or more items.

### Block type

- **Means**: which kind of block it is, the value of its `type` field.
- **Shows as**: Document `type`; prose "block type".
- **Replaces**: "block kind" and "block kinds".
- **Not**: answer style.

### Item

- **Means**: anything on the page a reviewer can select and comment on: a step, a table, a column,
  a finding, a question, an option, a file in the viewer, or the whole document.
- **Shows as**: page numbered entries; Document `id` on each one; Answers file `comments[].item`;
  CLI `on <item id>`; prose "item".
- **Replaces**: node, in all prose and in the answers file field `comments[].node`.
- **Not**: block. Not the digest's pending list, which lists threads.

### Reading column

- **Means**: the centre of the page, where blocks are read top to bottom.
- **Shows as**: no page label; prose "reading column". Code calls it `#left` and `BlockOut.left`.
- **Replaces**: "left pane" and "left" in prose.
- **Not**: contents.

### Contents

- **Means**: the pane at the side that lists sections, blocks and items as a tree, each row with
  the open questions and threads under it.
- **Shows as**: page "Contents".
- **Replaces**: nav, navigation (in prose). Never "left pane".
- **Not**: reading column.

### Details

- **Means**: the extra text for an item, folded under the item in the reading column. It opens
  when the item is selected or its **More** control is pressed.
- **Shows as**: page fold "More", or the item's title and one-line summary where the reading
  does not show the item as a row (a diff finding); Document `detail` (the field keeps its name);
  prose "details".
- **Replaces**: walkthrough, walkthrough section, section (for that pane).
- **Not**: summary, the one line shown beside the item.

### Section

- **Means**: a part of the document that a `heading` block starts. It holds the blocks after the
  heading until the next heading at the same or a higher level, so sections nest.
- **Shows as**: page heading in the reading and a folding row in the contents; Document block
  `type: "heading"` with `level` 1 to 3. The code type `Section` is internal and means one item's
  row, Threads section and details.
- **Not**: details; not a block.

### About the whole document

- **Means**: the part of the page for feedback that is not about one item; its item id is the
  document id. It is one running conversation with the agent: the first message is a comment, the
  rest are replies in it.
- **Shows as**: page heading "About the whole document" in the Chat tab, with a message
  box under it; Answers file `comments[]` with `item: <document id>`. Feedback on the whole document
  that goes with the verdict is the finish summary.
- **Replaces**: General notes, "Notes" in the contents.

## Questions

### Question

- **Means**: a decision the agent needs from the reviewer.
- **Shows as**: Document `questions[]` or a `question` block; page question card; prose
  "question".
- **Not**: ask back, which is the reviewer asking the agent.

### Answer style

- **Means**: how a question is answered: one option, several options, or free text.
- **Shows as**: Document `style: single | multi | text` (values unchanged); prose "one option",
  "several options", "free text".
- **Replaces**: question `kind` (the field and the word). "Single" and "multi" in prose.
- **Not**: `kind` on operations, code-flow steps and workflow steps, which keeps its name and
  means a category.

### Option

- **Means**: one of the answers a question offers.
- **Shows as**: Document `options[]`, each with `id` and `title`; page radio or checkbox.
- **Replaces**: option `label`; "pick" and "choice" as nouns for an option.
- **Not**: answer. An option is offered; an answer is given.

### Recommended

- **Means**: the option the agent suggests; shown first and marked.
- **Shows as**: Document `recommended`; page "recommended" badge.

### Answer

- **Means**: what the reviewer gives a question: the options they chose, or their free text.
- **Shows as**: Answers file `choices[<question id>]` (the field keeps its name), with `selected`
  for options and `text` for free text; page "Your answer" on a free-text question; CLI
  `answered: …`.
- **Replaces**: "choice" in prose; "note" for a free-text answer (the field `note` on a free-text
  question becomes `text`).
- **Not**: reply.
- **Sending**: an answer, options chosen with no words or free text, goes to the agent with the
  verdict. It opens no thread; finishing stamps it `sent`.

### Note

- **Means**: optional words beside the options a reviewer chose.
- **Shows as**: Answers file `choices[<question id>].note`; page "Optional note" under a
  one-option or several-options question; CLI `[note]` once sent.
- **Replaces**: nothing. It loses its other meanings: a free-text answer is an **answer**,
  General notes become **About the whole document** and the **finish summary**.
- **Sending**: a note is sent to the agent with "Send to agent". Once sent it opens a thread and
  waits for a reply; `--wait` reports it as `[note]`, and the agent replies into it.
- **Not**: ask back, which keeps the question open.

### Ask back

- **Means**: the reviewer chooses "None of these, or I have a question" and writes what is
  missing; the question stays open until the agent replies.
- **Shows as**: page "None of these, or I have a question", state "Asked back"; Answers file
  `choices[<question id>].ask`; CLI `[ask]`, digest "asked back".
- **Replaces**: "Asked the agent", "asked-back", the digest's `ASKED`.

### Changed

- **Means**: the agent edited a question since the reviewer last looked at it.
- **Shows as**: page "Changed since you last looked"; CLI digest flag "changed since the reviewer
  looked"; digest JSON `questions[<id>].status: changed`; Answers file `seen` (question id to
  hash).
- **Not**: out of date, which is about the answer. Not the reply action `revised` (was `changed`).

### Out of date

- **Means**: the reviewer's answer was given to an earlier wording of the question.
- **Shows as**: page "Out of date"; CLI digest state line `out of date: …` and flag "answer out of
  date"; digest JSON `questions[<id>].status: out-of-date` and `questions[<id>].outOfDate`;
  Answers file `choices[<id>].hash` differs from the question's. Only an answer can be out of
  date: a chosen option or free text, not an ask or a note with no option chosen.
- **Replaces**: stale, "answered before the change", "answer predates an edit", `staleAnswer`.
- **Counts**: an out-of-date answer does not count as answered. It shows amber and is listed in
  the Finish sheet until the reviewer answers again or keeps it (page "Keep answer").
- **Not**: changed, which is about the question.

### Closed

- **Means**: the agent settled a question and gave a one-line resolution.
- **Shows as**: Document `status: closed`, `resolution`; page "Closed", "Chosen: <option>"; CLI
  `closed:`.
- **Replaces**: "Decided".
- **Not**: approved. Closing settles one question; approving ends a round.

### Reopen question

- **Means**: the reviewer asks the agent to look again at a closed question or one they answered. It
  shows only on a closed question or an answer that was sent or given before a verdict.
- **Shows as**: page button "Reopen question", state "Reopened"; Answers file
  `choices[<id>].reopened`; CLI `[reopen]`.
- **Replaces**: the "Reopen" button on a question. "Reopen" now means only this.
- **Not**: change verdict, new round.

## Comments and threads

### Comment

- **Means**: words the reviewer writes on an item, on selected words, on a region of an image, on
  a file in the viewer, or on the whole document.
- **Shows as**: page "Comment"; Answers file `comments[]` with `item`, `text`, `at`, `selector`;
  CLI `[comment] <thread id> on <item id>`.
- **Not**: answer, note.

### Draft

- **Means**: a comment the reviewer saved but has not sent.
- **Shows as**: page "Save draft"; Answers file comment with no `sent`; CLI "unsent comments".

### Send

- **Means**: deliver something to the agent now: a comment, an ask back, a note or a reply.
- **Shows as**: page "Send to agent", "Send N to agent", and "Queue N to agent" while the page
  can't reach the server; Answers file `sent`. A static page has no Send: exporting the answers
  file sends everything unsent.
- **Not**: finish review, though finishing sends every unsent comment, note and ask back with the
  verdict. Answers go with the verdict, not with Send. The Questions tab says so at its head:
  "Comments and asks go to the agent now. Answers go when you finish."

### Thread

- **Means**: a sent comment, ask back, note or reopen question, together with every reply under
  it.
- **Shows as**: page thread under the item; Answers file `replies[]`; CLI `--reply <thread id>`.
  A thread id is the comment id, or the question id for anything on a question.
- **Not**: item. One item can have several threads.

### Reply

- **Means**: any message added to a thread after the first one, by the agent or the reviewer.
- **Shows as**: page "Reply"; Answers file `replies[]` with `from`, `text`, `at`, `action`; CLI
  `answers --reply`, digest "reply to".
- **Replaces**: "follow-up" for a reviewer's reply (also digest JSON `followUpTo`).
- **Not**: answer.

### Reply action

- **Means**: what the agent did about a thread: `answered`, `revised` or `declined`.
- **Shows as**: CLI `--action answered | revised | declined`; Answers file `replies[].action`.
- **Replaces**: the value `changed`.
- **Not**: changed, which is about a question.

### New reply

- **Means**: an agent reply the reviewer has not seen yet. It counts as seen once it has been
  shown on the page for a second, with at least half of it on screen or, for a reply taller than
  the screen, at least half the screen full of it. It also counts as seen when the reviewer wrote
  later in the same thread.
- **Shows as**: a dot on the reply, its item and its contents entry; "New reply" on a
  question; the status bar count "N new replies"; the `u` key steps to the next one. Answers file
  `seenReplies` (message id to when it was seen).
- **Not**: changed, which is a question the agent edited. Not the CLI's new answers, which the
  agent has not read.

### Seen

- **Means**: one side has read a thread and has nothing to add. The reviewer marks an agent reply
  seen; the agent marks a sent thread seen. A mark is a time kept in the thread, one per side. A new
  message from the other side voids it, and so does the marker's own reply. The reviewer can mark
  any thread the agent has written in; the agent can mark any sent thread. The agent's mark takes
  the thread off the waiting list.
- **Shows as**: page toggle "Mark seen" and "Seen ✓" next to the reply box, offered on a thread the
  agent has written in, the status bar count "N not seen", and the line "Seen by the agent"; CLI
  `answers --ack <thread id>` and `--unack <thread id>`, digest lines "seen by you, no reply: …" and
  "seen by the reviewer: …"; Answers file `reviewerAck` and `agentAck` on a comment or a question's
  answer.
- **Not**: New reply, which is the page's own count of agent replies not yet shown to the
  reviewer. Not `seen`, the question marks.

### Waiting for a reply

- **Means**: a thread whose last message is the reviewer's, sent, with no agent reply after it and
  no agent Seen mark.
- **Shows as**: page "Waiting for a reply"; CLI digest "waiting for a reply: N".
- **Replaces**: "awaiting the agent", "awaiting a reply from the agent", "sent, awaiting reply",
  "Waiting for the agent to reply".

## Rounds and the verdict

### Round

- **Means**: one pass of review, from the agent starting it to the reviewer finishing it.
- **Shows as**: prose "round"; Answers file `roundStartedAt`.

### Finish review

- **Means**: the reviewer's act that ends a round by giving the verdict.
- **Shows as**: page button "Finish review" and its sheet; CLI `[verdict]`.
- **Sending**: before it records the verdict, it sends every unsent comment, note and ask back,
  and stamps every answer `sent`. The sheet says so ("finishing sends them").
- **Replaces**: "finish" alone in prose when it means this.

### Verdict

- **Means**: the outcome of a round: request changes or approve, with an optional finish summary.
- **Shows as**: page buttons "Request changes" and "Approve"; page states "Changes requested" and
  "Approved"; Answers file `verdict: reviewing | changes-requested | approved` and `finished`; CLI
  `[verdict]`, digest `verdict <value>`.
- **Replaces**: answers file `status`.
- **`reviewing`**: means no verdict yet. It is the value while a round is open.
- **Not**: closed. Not a question's `status`.

### Approve

- **Means**: the verdict that says the work can go ahead; allowed only when every question is
  answered.
- **Shows as**: page "Approve", state "Approved"; Answers file `verdict: approved`.
- **Not**: finish review, which also covers request changes.

### Request changes

- **Means**: the verdict that asks the agent to revise and start a new round.
- **Shows as**: page "Request changes", state "Changes requested"; Answers file
  `verdict: changes-requested`.

### Finish summary

- **Means**: the reviewer's optional text on the whole document for one round, given with the
  verdict. It is the one whole-document input that goes with the verdict; comments on the whole
  document go under About the whole document.
- **Shows as**: page box "About the whole document" in the Finish review sheet; Answers file
  `summary`; CLI digest first line.
- **Lifetime**: a new round deletes it.
- **Replaces**: General notes' "Notes on the whole document" box, and Answers file `notes`.
- **Not**: the document `summary`, which the agent writes.

### Editing after the verdict

- **Means**: the reviewer can still pick, answer, comment and reply once the verdict is given. The
  page keeps these edits; they do not lock. The verdict stands until the agent starts a new round
  or the reviewer uses Change verdict, and the edits count in the next round.
- **Shows as**: page line under the verdict chip, "Review finished. Edits are kept for the next
  round."
- **Not**: a lock. Nothing asks the reviewer to unlock the answers first.

### Change verdict

- **Means**: the reviewer takes back the verdict within the same round and can finish again.
- **Shows as**: page action "Change verdict" on the verdict chip; notice "Verdict cleared".
- **Replaces**: "Reopen" on the verdict chip and the notice "Review reopened".
- **Not**: new round.

### New round

- **Means**: the agent starts the next round after revising: verdict back to `reviewing`, finish
  summary cleared, answers kept.
- **Shows as**: CLI `answers --new-round`, which prints `new round <id>`; Answers file
  `roundStartedAt`.
- **Replaces**: `--reopen`, the output `reopened <id>`, and `reopenedAt`.
- **Not**: reopen question, change verdict.
