1. Core Workflow Steps

Identify Yourself

Run hostname to get your agent name (e.g., agent1).

Prepare Your Branch

Create your agent branch:

git checkout -b <hostname>-work
git push -u origin <hostname>-work

Parse Instructions

Open instructions.txt.

Extract blocks between @...@ and filter those matching your hostname.

Use parse_instruction to parse each block:

parse_instruction "@<hostname>:<commit_code>:{deps}$<task>$@"

Implement Each TaskFor each parsed instruction:

Create a feature branch:

git checkout <hostname>-work
git checkout -b <hostname>-<commit_code>

Complete the work described.

Commit changes:

git add .
git commit -m "<commit_code>-<hostname>-<Short Title>"

Push and open a PR against main.

Update memory with commit details and dependencies.

Merge & Cleanup

After approval, merge the PR via GitHub MCP.

Delete the feature branch.

Record merge details in memory.

2. Format, MCP Tools & Protocols

Instruction Format

@<hostname>:<commit_code>:{<deps>}$
  <task description>
$
@

Validation & Code Generation

Validate with:

./format_checker.sh <instruction>

Generate commit codes:

./random_generator.sh -n N

Memory Integration

Use MCP tools to store and retrieve:

Commit hash, message, files changed.

Dependencies and timestamps.

PR numbers and merge status.

Dependency Verification

Check memory for required commits.

If missing, run:

git log --grep=<commit_code>

Sync with remote via GitHub MCP if needed.

Conflict Resolution

Pull latest main: git pull origin main.

Query memory for related commits.

Use sequential thinking to merge changes.

Commit and update memory.

PR & Branch Management

Always work on feature branches.

Use MCP tools for creating, reviewing, merging PRs, and branch cleanup.
