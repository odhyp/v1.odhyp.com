+++
# Metadata
title = "Python Module: Rich"
description = "Cheatsheet for formatting text, tables, and layouts using the Rich Python module"
slug = "python-module-rich"
date = 2025-08-04T08:54:04+07:00
lastmod = 2025-08-31T17:19:49+07:00
draft = false

# Page setting
toc = false

# Taxonomies & Routing
category = "python"
aliases = ["/2025-08-04-python-module-rich"]
+++

**Rich** is a Python library for rich text and beautiful formatting in the terminal. Use `uv add rich` or `pip install rich` to install the library.

## Quick Start

```python
from rich import print

print("[bold magenta]Hello[/bold magenta] [green]World![/green]")
```

## Text Styles

Use style tags inside `print()` or use the `Text` class.

```python
from rich import print
from rich.text import Text

# Inline styles
print("[bold red]Error:[/] Something went wrong!")

# Using Text object
text = Text("Important", style="bold underline green")
print(text)
```

Common styles:

- `bold`, `italic`, `underline`, `strike`, `dim`
- Colors: `red`, `green`, `blue`, `yellow`, etc.
- Background: `on red`, `on green`

## Tables

```python
from rich.table import Table
from rich.console import Console

console = Console()
table = Table(title="User Info")

table.add_column("Name", style="cyan")
table.add_column("Role", style="magenta")
table.add_row("Alice", "Admin")
table.add_row("Bob", "User")

console.print(table)
```

## Panels

```python
from rich.panel import Panel

console.print(Panel("This is inside a panel", title="Note", subtitle="footer", style="bold cyan"))
```

## Logging

Rich can enhance Python’s `logging` module.

```python
import logging
from rich.logging import RichHandler

logging.basicConfig(level="INFO", handlers=[RichHandler()])
log = logging.getLogger("rich")

log.info("This is an info message")
```

## Progress Bars

```python
from rich.progress import Progress
import time

progress = Progress()

with progress:
    task = progress.add_task("Processing...", total=100)
    while not progress.finished:
        progress.update(task, advance=1)
        time.sleep(0.05)
```

## Syntax Highlighting

```python
from rich.console import Console
from rich.syntax import Syntax

code = """def hello():\n    print("Hello, World!")"""
syntax = Syntax(code, "python", theme="monokai", line_numbers=True)
console = Console()
console.print(syntax)
```

## Layouts and Live Updates

```python
from rich.live import Live
from rich.table import Table
import time

table = Table()
table.add_column("Time")

with Live(table, refresh_per_second=4):
    for _ in range(10):
        table.add_row(time.strftime("%H:%M:%S"))
        time.sleep(1)
```

## Notes

- Use `rich.print()` for styled output instead of `print()`.
- Use `Console().print()` for advanced features (e.g. tables, layouts).
- Rich automatically detects terminal width and color support.

## Links

- 📚 [Documentation](https://rich.readthedocs.io/)
- 🧑‍💻 [GitHub Repo](https://github.com/Textualize/rich)
