# The page and the answers file

- [The page](#the-page): the panes, the reading, threads, saving and live updates.
- [Files on the page](#files-on-the-page): the file viewer, region crops and wikilinks.
- [What the reviewer can send](#what-the-reviewer-can-send): comments, asks, notes and the verdict.
- [Questions on the page](#questions-on-the-page): how questions are shown and answered.
- [The answers file](#the-answers-file): what the file holds.

This file says what the reviewer sees on the page, what reaches the agent and when, and what the
answers file holds. The skill text, `$parley:parley` and its `loop.md`, says what to do. The words follow
`glossary.md`.

## The page

- The page has three panes under a thin top bar: the contents on the left, the reading in the
  centre, and the conversation on the right. The top bar holds the panes' toggles, the title, the
  question meter, **Search** and **Finish review**. A quiet status bar at the foot holds where
  answers are saved, whether an agent listens, what waits on the agent, Send, the new-reply count,
  the keys and **Settings**. Panes close (`[` and `]`, or the bar's toggles) and resize by their
  gutters; each browser keeps their state and widths. Up to 1100 px a pane floats over the reading;
  up to 760 px bottom tabs (Contents, Read, Threads, Questions) switch between them.
- The reading shows the blocks in order, with every item numbered. The contents is a tree: each
  block with its items under it, and a comment count on every item that has one.
- The conversation pane has three tabs. **Threads** lists the selected item first, with its
  details and a **Comment** button, then every other item that has threads; filters show all,
  new replies, waiting or drafts. It shows only what the reading does not: a step's explanation,
  a table's columns, an operation's lock and rollback. **Questions** holds every question, with
  **Finish review** at its foot; a question block, and an item a question is about, link to it.
  `group` on a question is a heading on its card. **Whole document** is one running conversation
  with the agent about the document as a whole, with a message box under it: Enter sends,
  Shift+Enter breaks a line. The first message is a comment whose item id is the document id;
  each later message is a reviewer reply in that thread (the newest sent one, when an older file
  has several). A comment that quotes words is not part of it. The agent reads it in `answers`,
  marked "(the whole document)" (`whole: true` in JSON), and answers with `--reply <thread id>`;
  `--wait` wakes on each new message. The Finish review summary ends the conversation as the
  reviewer's message with the verdict. The comment box serves the items; it opens at the top of
  the Threads tab.
- Click or hover any pane and the others highlight. `j` and `k` step through items. `Tab` also
  reaches every item, and `Enter` opens it. `n` and `p` step through questions; with shift, open
  ones only. `u` steps to new replies. `c` comments on the selected words, or on the selected item
  when no words are selected. `m` opens the Whole document tab with the focus in its message box.
  `Esc` clears. The URL hash links to an item. `c` and `m` do nothing while a dialog, the
  lightbox or the file viewer is open.
- `⌘K` on a Mac, `Ctrl+K` elsewhere (or **Search** in the top bar), opens the command palette: one
  list of commands (every key above, every Settings choice, Send, Export, Finish review), the
  contents' items, the questions and the other documents. Typing filters it; the arrow keys move,
  `Enter` runs and `Esc` closes. Settings lists the keys from the same list, and a key's command
  runs that key.
- The reviewer can select words in the reading or the Threads tab. A **Comment** pill appears.
  The comment lands on the item under the selection and quotes the words. The quoted words stay
  highlighted on later renders until they change.
- The question meter has one segment per question: red open, amber asked back or out of date,
  green answered; a closed question counts as answered. Its tally ("1 of 5 answered") is the only
  answered count. `blocking` questions come first, with the tallest bar, then `high` ones, with a
  taller bar; the tally adds "N blocking, N high priority open".
- The line over the document's title, at the head of the reading, gives the author, the revision
  and when the document was last written.
- The status bar says "Agent listening" while `answers --wait` or `--notify` runs on the
  document, and "No agent listening" otherwise. A thread waiting on the agent says "Waiting for a
  reply". **Settings** says where each setting is kept. This browser keeps the appearance, where
  source links open, the checkout folder per repository and which panes are open, for every
  document. The answers file keeps whether the first-visit card is shown, so it follows the reviewer
  to any browser. Settings also holds Export and the keys, and ends with **About**: the parley
  version, the build id and date baked in at build, and the server's `parley.mjs` (its name only
  on the local network). When a newer build is on disk than the server runs, the page says so and
  asks for a restart; the server checks the file each time it renders a page.
- A first visit shows a card at the top of the Threads tab on how to review. Once closed it stays
  closed for that document; Settings turns it back on.
- Every figure and diagram has an expand button that opens it full size. A wide diagram uses the
  reading pane's full width. An expanded diagram fills the screen at the size that fits it, and
  zooms and pans: the toolbar's buttons, `+` `-` `0` and the arrow keys, Ctrl+wheel or pinch, and
  drag. A figure, or a shot in a `story` block, can carry `regions`: boxes you mark on the image.
  Each box is a node `<owner id>.<region id>`, drawn faint, labelled on hover, focus or selection,
  and kept in the expanded view. A reviewer comments on a box like on any item; the comment's `node`
  is that id, and it carries a `crop` of the box.
- The reviewer can draw a box on any image in the reading or the expanded view: drag with a mouse,
  or press the image's **Comment on a region** button, move the box with the arrow keys, size it
  with Shift and the arrows, and press Enter (Escape cancels). While the button's box is up, a
  finger drags one. The box starts a thread on the image's item. Its `selector` is the viewer's
  `FragmentSelector` (`xywh=percent:x,y,w,h`), with `src` naming the image when the item is not the
  image's own figure, and it carries a `crop`. `parley answers` prints
  `region x 0.1 y 0.2 w 0.3 h 0.4 on image <figure id or path>` under it, in fractions of the image.
  The box stays drawn over the image; clicking it opens its thread, and clicking the thread lights
  the box. Print shows the sent boxes. The downloaded markdown lists each sent box and its image
  under its block, without the comment's words, as it leaves out every other comment.
  The button sits beside a figure's expand button, shows on hover or focus where a pointer can
  hover, and always shows on touch. An image under 64 px a side has none (a mouse still drags).
- A story frame loads one at a time. When the document's Storybook does not answer, a banner
  says so and shows `storybookStart`.
- The server's front page lists every document in the folder, newest first, with its block
  types, verdict and counts.
- Opening a page writes nothing. The fallback status (an approval shown as reviewing while a
  question is open) and the seen marks stay in the page until the reviewer acts, and the next save
  carries them, and so does a mark that an agent reply was seen (`seenReplies`); a reply read in a
  visit with no later action shows as new again after a reload. `sent` stamps are set when the
  reviewer sends.
- The page saves on every change. With the server running, it saves to the answers file. While
  the server cannot take a save, the page keeps it in the browser and sends it later. When the
  page can't reach the server, a line under the header says so, and Send and **Finish review**
  queue until it is back. When the answers file is broken, the pill gives the server's reason and
  the file to fix. A static page keeps answers in the browser and has no Send: **Export** is the
  main action and sends everything unsent in the file, and **Finish review** downloads it to give
  to the agent.
- The server watches the folder. Revise the document and the open page updates in place. It keeps
  the reviewer's scroll, selection and unsent text, and a line names the questions that changed or
  are new. A document the server cannot read keeps the page, with a line that says so.

## Files on the page

- Every `source` with a path from the repository root shows the path, a **View** link and, when
  the document sets `repo`, a **GitHub** link pinned to `repo.commit`.
- **View** opens the file in the server's file viewer: markdown rendered, code at its lines, images
  and PDFs as themselves. The reviewer can comment there too. Those comments are on item `f:<path>`,
  and a comment on part of an image prints `region … on image <path>`. The viewer also saves a small
  PNG of the marked part (at most 512 px a side) beside the documents, as
  `x/crops/<doc id>/<comment id>.png`; that folder holds only crops. The server keeps at most 200
  crops a document and deletes a crop when its comment is deleted. The comment's `crop` field names
  it, and `parley answers` prints `crop <path>` under the comment, so you can open the image without
  rendering the file. A general comment has no crop.
- A `[[name]]` wikilink in prose opens `name.md` in the viewer. It has no GitHub link.
  When several files share the name, the link opens the one at the repo root, else the one sharing
  the most leading folders with the document (the folder `parley serve` serves, on the page), else
  the shortest path, else the first in alphabetical order. A name with a folder, such as
  `[[guide/README]]`, matches the end of a file's path and so picks one file; if no path ends that
  way it does not resolve (it does not fall back to the base name). `parley check` warns on a link
  that more than one file could mean, names the file it opens and the path forms that pick the
  others. Text in code spans and in diff and code-flow blocks is not checked.
- The reader can set their checkout folder on the page. The path then also opens in the editor
  they pick in the page's editor menu (kept per browser).
- An absolute path shows only the file name. It links as `file://` on a page opened as a file,
  unless the reader chose an editor, which then wins. On a served page it opens in the reader's
  editor (browsers block `file://` there). Its full path is
  still in the page's HTML, so do not use one in a page you commit. A `~` path, a network share or
  a path ending in `/` fails `check`.
- The server serves files only from a git checkout, and only files git lists.

## What the reviewer can send

| The reviewer | Arrives as | When |
|---|---|---|
| Adds a comment and sends it | `[comment] <comment id> on <item id>` | at once |
| Saves a comment as a draft | nothing | when they send it, or finish |
| Chooses "None of these, or I have a question" | `[ask] <question id> on <question id>` | at once |
| Sends a note beside a chosen option | `[note] <question id> on <question id>` | at once |
| Replies in a thread | the thread's line, a line `reply to “…”` quoting the agent's last message, then every reviewer message since it | at once |
| Presses **Reopen question** | `[reopen] <question id> on <question id>` | at once |
| Chooses options, or answers a free-text question | nothing | with the verdict |
| Presses **Finish review** | `[verdict] changes-requested` or `[verdict] approved` | at once |

- A thread is a sent comment, ask back, note or reopen, with every reply under it. "Reply to each
  send" in `loop.md` says which id `--reply` takes.
- A thread is waiting for a reply while its last message is the reviewer's.
- Words typed with no option chosen count as an ask back. A note beside a chosen option stays a
  note.
- Editing a sent ask or note makes a new message to send. Once the agent has replied, it goes
  into the thread as a reply.
- **Finish review** opens a sheet. It lists what is still open and every out-of-date answer. It
  takes an optional finish summary. Then it gives the verdict: **Request changes** or
  **Approve**. Approve is disabled while a question is open or an answer is out of date. A
  `blocking` question with no current answer is named in a warning at the top of the sheet, with
  a link to it; Request changes still works.
  Finishing sends every draft and every answer.
- After the verdict, **Change verdict** takes it back within the same round. Until then the page
  says "Review finished. Edits are kept for the next round." Edits made after the verdict are
  saved and nothing locks; the verdict stands until the agent runs `--new-round`.
- **Seen** marks a thread read without a reply. The reviewer can mark any thread, comment or
  question, that the agent has written in; the toggle sits next to the reply box and reads "Mark
  seen", then "Seen ✓". The header counts "N not seen": threads the agent wrote last in that the
  reviewer has neither marked nor answered, and the count steps to the next. The agent runs
  `answers <id> --ack <thread id>` on any sent thread, which takes it off "waiting for a reply" and
  shows on the page as "Seen by the agent"; `--unack <thread id>` takes it back and a running
  `--wait` reports the thread again. A new message from the other side voids a mark, and so does
  the marker's own reply: replying means the thread was read, so the reviewer's reply clears their
  own mark too. The digest lists "seen by you, no reply" and "seen by the reviewer".

## Questions on the page

- Every question offers "None of these, or I have a question". That stores an ask back. The
  question stays open until the agent replies and the reviewer chooses.
- A question with options is answered only by a chosen option. A note with no option chosen
  shows in the digest as `open, note with no option chosen`.
- A free-text question's answer opens no thread. It goes with the verdict and shows in the digest
  as `answered: "<text>"`.
- A question edited since the reviewer last looked shows "Changed since you last looked". An
  answer given to the old wording is out of date. It shows amber and does not count as answered.
  The reviewer answers again or presses **Keep answer**. Earlier answers show under the question.
- A closed question collapses and shows its `resolution` and the chosen option.
- **Reopen question** shows on a closed question, and on an answer that was sent or given before
  a verdict. It clears the answer and keeps the old one in its history. The question then stays
  open, even if it has `status: closed`, until the agent settles it.
- A reopen is settled by an agent reply after it, and then one of these: the next revision after
  that reply, or, on a question that was not closed, a new answer from the reviewer. A revision
  with no reply after the reopen does not settle it.

## The answers file

Its JSON Schema (2020-12, version 1, `$id` `urn:parley:schema:answers:1`) is [answers.schema.json](answers.schema.json);
`node parley.mjs schema --answers` prints it. Validate with it; the format is below.

`<id>.answers.json` sits beside the document. The server writes it; never edit it by hand. Read it
with `node parley.mjs answers <id>`, which prints the digest. `--json` (or `--output json`) prints
it as one line of JSON: the answers file's own fields, `revision`, `pending` and `questions`, beside
the envelope's `v`, `ok`, `command`, `warnings` and `next` (`parley help json`). A pending comment
on a box carries `region`: `{ x, y, w, h, page?, image }`, the box in fractions of the image
(0 to 1) and the image (a figure id or the image's path).

- `verdict`: `reviewing` while the round is open, then `changes-requested` or `approved`.
  `finished` is when it was given. `summary` is the finish summary.
- `blocking`: the ids of the `blocking` questions with no current answer when the verdict was
  given. The page stores it with the verdict and leaves it out when there were none. It is cleared
  when the verdict is: Change verdict, a reopened question that returns an approval to reviewing,
  and `--new-round`. A verdict from before the field has none. The verdict in `pending` carries
  this stored list as `blocking`, and the text digest and `--wait` say "finished with blocking
  questions unanswered".
- `blockingOpen` (`--json` only): the ids of the `blocking` questions with no current answer now,
  computed from the current answers. The digest's live line "blocking questions with no current
  answer" is the same list. It can differ from `blocking`, which is fixed when the verdict is given.
- `comments`: each comment, with the item it is on, its text and, for selected words, a
  `selector` holding the exact words. On a box drawn on an image the `selector` is a
  `FragmentSelector` whose `value` is `xywh=percent:x,y,w,h` (`page=N&` first on a PDF page), and
  `src` is the image's path (from the document folder for `x/…`, else from the repo root) when the
  item is not the image's own figure. `box` is where the reviewer moved the comment box, as
  `dx` and `dy` in pixels from the words; the page shows the comment there when the words are
  hovered. A comment with no `box` uses the default place.
- `choices`: the answer to each question, keyed by question id. It holds the chosen options, a
  note or an ask back, the thread, and earlier answers.
- `replies`: the thread under a comment or a question. The agent's replies carry `action`
  (`answered`, `revised` or `declined`), the document `revision` and who sent them.
- `seen`: what each question looked like when the reviewer last looked at it.
- `seenReplies`: the agent replies the reviewer has seen, by message id, each with when the server
  took the mark. A reply missing from it is new to the reviewer, unless the reviewer wrote later in
  the same thread.
- `who`: on a comment, a message and an answer, who wrote it: `{ id, name }`, with `agent: true`
  on the agent's replies. The server stamps it when it first stores the item and keeps it after,
  so a page cannot change it. On this machine's page it is the person running parley, and the
  agent's replies are that person's agent. On the network link it is the guest, by the name their
  browser gave. Items from before it existed have none. The digest names the writers after each
  pending send, as `from Kim, Sam`.
- `reviewerAck`, `agentAck`: on a comment or a question's answer, when the reviewer or the agent
  marked the thread seen. A mark counts until the other side writes in the thread after it.
- `agentReadAt` is set by `--mark-read`. `roundStartedAt` is set by `--new-round`.
- `settings`: the reviewer's settings for this document. `intro` is when the first-visit card was
  closed; while it is set, the card stays closed.
