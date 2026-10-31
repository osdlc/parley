# The demo review

The launch deck's screenshots (`src/decks/launch/*.webp`) come from this review, run on parley
0.2.1: an agent's plan to email the customer when an order ships, with two questions and the diff
it proposes. `ship-email-plan.answers.json` is the finished review: one comment on the diff
finding with the agent's reply, both questions answered, and the verdict approved.

To take the screenshots again, after a change to the page:

```sh
node <the parley skill folder>/parley.mjs serve site/demo --port 4371
```

The skill folder is in the installed plugin, or in this repository at
`.claude-plugin/packs/parley/skills/parley/`.

Open `http://127.0.0.1:4371/d/ship-email-plan` in a 1440 by 900 window at 2x. Each slide's image
is a crop of one view: the whole page, the Questions tab, the thread on the finding, the diff, and
the Finish review dialog. Delete the answers file first to see the page before the review.
