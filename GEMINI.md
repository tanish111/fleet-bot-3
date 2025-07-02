GEMINI Agent Workflow
To start, each GEMINI agent identifies itself by the system hostname. Running the hostname command returns the machine's unique network name
. Use this name to select the tasks intended for you. The instructions.txt file contains build tasks organized in sections bracketed by @. Each section begins with @<hostname>:<commit_code>:{deps} (where <deps> is a list of dependent commit codes) followed by a $ line describing the work, and ends with @. 
You can use this script to extract each item from instruction(any thing between @..@ is a new instruction and can use script to parse)
parse_instruction() {
    local input="$1"
    # Check if input starts with @ and ends with @
    if [[ ! "$input" =~ ^@.*@$ ]]; then
        echo "Error: Invalid format - instruction must be encapsulated in @...@"
        return 1
    fi
    
    # Remove the outer @ symbols
    local content="${input:1:${#input}-2}"
    
    # Check for $ delimiters for text instruction
    if [[ ! "$content" =~ \$.*\$ ]]; then
        echo "Error: Invalid format - text instruction must be encapsulated in \$...\$"
        return 1
    fi
    
    # Extract the text instruction (everything between $ delimiters)
    local text_instruction="${content#*\$}"
    text_instruction="${text_instruction%\$*}"
    
    # Extract parts before the first $
    local before_text="${content%%\$*}"
    
    # Parse the before_text part: <hostname>:<commit-code>:{<dependency_instruction>}
    
    # Split by first colon to get hostname
    if [[ ! "$before_text" =~ : ]]; then
        echo "Error: Missing colon separator for hostname"
        return 1
    fi
    local hostname="${before_text%%:*}"
    local rest="${before_text#*:}"
    # Split rest by colon and curly braces to get commit-code and dependencies
    if [[ ! "$rest" =~ :\{ ]]; then
        echo "Error: Invalid format - expected :<commit-code>:{<dependencies>}"
        return 1
    fi

    local commit_code="${rest%%:*}"
    local deps_part="${rest#*:\{}"
    local dependencies="${deps_part%\}*}"
    
    # Output parsed components
    echo "=== PARSED INSTRUCTION COMPONENTS ==="
    echo "Hostname: $hostname"
    echo "Commit Code: $commit_code"
    echo "Dependencies: $dependencies"
    echo "Text Instruction: $text_instruction"
    echo "===================================="
    
    return 0
}
Strictly filter tasks by matching the <hostname> to your hostname; ignore any instruction blocks not tagged for you. For example, if hostname returns agent1, only process sections that start with @agent1:....
Run hostname: Obtain your agent's identity (e.g. agent1)
.
Open instructions.txt: Read through the file's sections demarcated by @.
Select matching tasks: Keep only the blocks whose <hostname> matches your agent's name. Discard others entirely.

## Branch-Based Workflow

**IMPORTANT**: Never push directly to the main branch. Always work on feature branches and use Pull Requests.

1. **Initialize your agent branch**: Create a new branch named after your hostname
2. **Work on feature branches**: For each task, create a feature branch off your agent branch
3. **Use Pull Requests**: Always create PRs to merge changes back to main
4. **Memory integration**: Store all commit contexts in memory for future reference

## Initial Setup

Before starting any work:

1. Run `hostname` to get your agent identity (e.g., agent1)
2. Create your agent branch: `git checkout -b <hostname>-work` (e.g., `agent1-work`)
3. Push the branch: `git push -u origin <hostname>-work`

## Dependency Verification

Before executing a task, ensure all its dependent commit codes are already in the repository history. Use memory to check previously stored commit contexts and verify dependencies.

1. **Check memory first**: Query the memory MCP tool for commit contexts and dependencies
2. **Verify with git log**: Check dependencies against Git log using `git log --grep=<commit_code>`
3. **Pull latest changes**: If dependencies are missing, sync with remote using GitHub MCP tools
4. **Use sequential thinking**: When analyzing dependencies, use the sequential thinking tool to understand the relationship between commits

```bash
# Example dependency check with memory integration
# Query memory for commit context before proceeding
# Use sequential thinking to analyze dependency chain
```

## Building and Committing Tasks with Memory Integration

When implementing tasks:

1. **Create feature branch**: For each task, create a branch from your agent branch
   ```bash
   git checkout <hostname>-work
   git checkout -b <hostname>-<task-description>
   ```

2. **Implement the task**: Complete the work as described in the instruction

3. **Stage and commit with memory**: 
   ```bash
   git add <files>
   git commit -m "<commit_code>-<hostname>-Title"
   ```

4. **Store in memory**: After each commit, use the memory MCP tool to store:
   - Commit hash and message
   - Files changed
   - Task description
   - Dependencies satisfied
   - Agent hostname
   - Timestamp

5. **Push feature branch**: 
   ```bash
   git push origin <hostname>-<task-description>
   ```

6. **Create Pull Request**: Use GitHub MCP to create a PR from your feature branch to main

7. **Update memory with PR context**: Store PR number, status, and merge information

## Conflict Resolution with Sequential Thinking and Memory

When merge conflicts occur:

1. **Query memory**: Use memory MCP to retrieve all relevant commit contexts
2. **Use sequential thinking**: Analyze the conflict using the sequential thinking tool with context from memory:
   - Review conflicting changes from memory
   - Understand the intent of each change
   - Determine the best resolution strategy
   - Apply changes that preserve both functionalities when possible

3. **Memory-informed resolution**:
   ```bash
   # Pull latest changes
   git pull origin main
   
   # If conflicts occur, use memory context to understand:
   # - What each conflicting commit was trying to achieve
   # - The order of dependencies
   # - The overall project state
   ```

4. **Resolve and document**: 
   - Resolve conflicts based on memory analysis
   - Create resolution commit
   - Update memory with conflict resolution details

## Pull Request and Merge Workflow

1. **Create PR**: Use GitHub MCP to create pull request from feature branch to main
2. **Review process**: 
   - Check that all dependencies are satisfied
   - Verify no conflicts with main branch
   - Review memory for any related commits
3. **Merge**: Use GitHub MCP to merge the PR after approval
4. **Cleanup**: Delete feature branch after successful merge
5. **Update memory**: Store final merge commit details and close the task in memory

## Synchronizing Changes with GitHub MCP

Replace direct git commands with GitHub MCP tools:

- **Instead of `git pull`**: Use GitHub MCP to fetch and merge changes
- **Instead of `git push`**: Use GitHub MCP to push branches
- **PR management**: Use GitHub MCP for creating, reviewing, and merging PRs
- **Branch management**: Use GitHub MCP for branch operations

After each synchronization, update memory with:
- New commits pulled
- Contributors and their changes
- Updated dependency status

## Generating New Instructions with Memory Context

When generating new tasks:

1. **Query memory**: Review completed tasks and project history from memory
2. **Use web search**: Find additional relevant tasks for the project
3. **Sequential thinking**: Use sequential thinking to plan task dependencies and ordering
4. **Avoid duplicates**: Check memory to ensure new tasks don't duplicate existing work

For each new instruction:
- Write in @<hostname>:<commit_code>:{deps} format
- Validate with `./format_checker.sh <instruction>`
- Generate commit codes using `./random_generator.sh -n N`
- Store instruction details in memory
- Distribute evenly among agent hostnames
- Append to instructions.txt

## Memory Management Best Practices

1. **After each commit**: Store comprehensive context in memory
2. **Before starting tasks**: Query memory for relevant context
3. **During conflicts**: Use memory to understand change history
4. **For planning**: Reference memory when creating new instructions
5. **Memory cleanup**: Periodically review and organize stored information

## Updated Additional Guidelines

- **Branch strategy**: Always work on feature branches, never push directly to main
- **PR workflow**: All changes must go through Pull Requests
- **Memory integration**: Maintain comprehensive commit and task history in memory
- **GitHub MCP**: Use GitHub MCP tools instead of direct git commands where possible
- **Sequential thinking**: Apply analytical thinking for complex decisions and conflict resolution
- **Documentation**: Keep memory updated with all project activities and decisions
- **Collaboration**: Use memory to understand other agents' work and avoid conflicts

By following these enhanced protocols, each GEMINI agent will maintain better context awareness, handle conflicts more intelligently, and coordinate more effectively through the branch-based PR workflow.