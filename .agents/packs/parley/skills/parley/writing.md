# Writing a parley document

How to write blocks and questions, and how to revise the document between rounds.
`node parley.mjs block <type>` prints the fields; this file has the rules for using them.

- [Blocks](#blocks): linking the files you name, and what to do when no block type fits.
- [Questions](#questions): answer styles, placement, `recommended`, and closing a question.
- [Revising](#revising): what to change on each pass, when to raise `revision`, and what never to
  change.
- [Reopened questions](#reopened-questions): replying to a `[reopen]` and keeping or closing it.

## Blocks

- **Link every file you name.** Every file the page names gets a link that opens it in the viewer
  and a link to GitHub. Give the item or block that names it a `source` with a path from the
  repository root. Set the document `repo` to the GitHub remote and the commit you read. The page
  then shows a link to the file viewer and a GitHub link. A `[[wikilink]]` does this for a `.md`
  file only, so any other file needs a `source`. `check` warns about a backticked repo path in the
  text that no `source` points at.
- **Give a step a `range`, not a pasted copy.** A step's `source` with a `range` shows the real
  lines, read at `repo.commit`, under the step. Do not paste them into another field to show them.
  If you must quote them in an `annotated-text` block, set `verbatim: true` on the step: `check`
  fails when the anchored text differs from those lines.
- **The reading carries the argument; `detail` carries the depth.** The reading shows every item
  with its title and one-line `summary`. Its `detail` folds under it, closed until the reviewer
  selects the item or opens the fold. Put what a reader needs to follow the page in titles,
  summaries and `prose`, and the evidence, code and caveats in `detail`. Do not repeat the summary
  in the detail.
- **Sections for a long document.** A `heading` block starts a section that holds the blocks after
  it until the next heading at its level or above; `level` 2 and 3 nest inside. The contents
  tree folds each section and shows its open questions and threads. A short page needs none.
- Find the type with `node parley.mjs blocks search <text>`. If none fits, use the nearest one. Say
  in the first `prose` block which type would have fit, and its fields.

## Questions

A question has an `id`, a `prompt`, an answer style and, unless it is free text, `options`.

- **Answer style** is the field `kind`: `single` for one option, `multi` for several options,
  `text` for free text with no options. Use `multi` only when the options are not alternatives.
- **Where it shows.** In a `question` block, at that place. In the document `questions`, under the
  `about` item, else at the end. `check` warns if `about` names an item with no section of its own;
  `node parley.mjs block question --field questions` lists them.
- **`group`** is a heading shown on the question's card in the Questions tab.
- **`priority`** is `blocking`, `high`, `normal` (the default) or `low`. Use `blocking` only when
  you cannot go on without the answer: the page lists it first, and Finish review warns while it
  has none. Use `high` for the questions that matter most, `low` for ones that can wait.
- **`recommended`** is the id of the option you suggest. Say why in that option's `detail`. Leave
  it off when you have no view. Never write "recommended" in a title; `check` warns.
- **One decision per question.** Put the facts in prose; put each option's cost in its `detail`.
- **Closing.** When a question is settled, set `status: closed` and a one-line `resolution`.

`loop.md` says when answers, asks back and notes reach you.

## Revising

The document is the running record of the review. On each pass:

- Raise `revision` by one when you rewrite questions or settle a reopen (see below). A pass that
  only updates status, or only adds or closes questions, does not need it.
- Never change or reuse an id. Answers and comments key on ids.
- Add new questions with new ids. Close settled ones.
- Reword a question the reviewer found unclear. An answer to the old wording becomes out of date.
- Edit by item id with `set`, `add`, `remove`, `move` and `apply`, as in
  the Editing section of `$parley:parley`; do not rewrite the JSON.
- Run `check`, commit the document with its answers file, and tell the reviewer what changed.

### When to raise `revision`

A long-lived document, such as a tracker, changes for weeks while the questions stay. These edits
change no question, so they keep every answer, comment, Seen mark and seen marker (the question
marks behind "Changed since you last looked"), with or without a `revision` bump. An open page shows
them in place:

- A matrix cell's `state`, `reason`, `hint` or `href`.
- A plan task's, workstream's or phase's `status`, `milestone` or `gate`.
- Prose, titles and details, and adding blocks.
- Adding a question, and closing one (`status`, `resolution`). Moving one (`group`, `about`,
  `source`) is not an edit either.

A raised `revision` never makes an answer out of date. What it does:

- The line over the title shows the new revision.
- It settles a reopen you replied to before the bump. Reply first, then raise it.
- A reviewer's answer changed after it is kept in the question's earlier answers. Without a bump, a
  change within 15 minutes replaces the earlier answer.
- Replies and answers are stamped with the revision they were made at.

What makes an answer out of date is an edit to the question's `prompt`, `kind`, options or media,
whatever `revision` says. See "Changed" and "Seen" in `glossary.md`.

## Reopened questions

A `[reopen] <question id>` means the reviewer reopened a question. Reply first, with
`--reply <question id>`, then raise `revision`. To leave it open, drop `status: closed` and
`resolution`; to close it again, keep them. `answers.md` says when a reopen is settled.
