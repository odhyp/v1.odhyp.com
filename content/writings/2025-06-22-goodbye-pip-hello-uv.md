+++
# Metadata
title = "Goodbye pip, Hello uv"
description = "A quick look at why I replaced pip and virtualenv with uv" 
slug = "goodbye-pip-hello-uv"
date = 2025-06-23T17:04:12+07:00
lastmod = 2025-08-05T07:39:47+07:00
draft = false

# Page setting
toc = true
cover = "https://astral.sh/static/OpenGraph/UV.png"

# Taxonomies & Routing
topics = ["python"]
aliases = ["/goodbye-pip-hello-uv"]
+++

I’ve been trying out the new `uv` from [Astral] for managing my Python project. It’s fast, simple, and honestly makes the usual `pip` + `venv` setup feel kinda clunky. So, I figured I’d write this down since I'm switching my Python project over to `uv`.

[Astral]: https://github.com/astral-sh

## Why even switch?

Python's tooling has always been a bit... scattered. You install stuff with `pip`, manage environments with `venv`, freeze those with `pip-tools`, or lock them using `poetry`. Each tool solves part of the problem, but juggling all of them gets tiresome fast.

For most of my Python projects, I just want to:

- Create a virtual environment
- Install the dependencies
- Keep dependencies consistent
- Move on

Python may be a [slow language] in terms of execution speed, but it's fast to write and great for turning ideas into actionable projects. Still, you’ve got to go through those steps for each new one.

[slow language]: https://blog.miguelgrinberg.com/post/is-python-really-that-slow

## What is `uv`

It's a Python package manager built by the team behind [Ruff], that basically combines `pip` for installing packages, `venv` for managing environments, `pip-tools` for generating lock files, and `pipx` for installing and running Python tools. It's pretty convenient for my use case, and it's fast (well, it's written in Rust).

Follow the [official docs] for installation instructions and more information.

[Ruff]: https://github.com/astral-sh/ruff
[official docs]: https://docs.astral.sh/uv/getting-started/installation/

## How I use it

The basic flow I follow for a new project is:

```bash
# 1. Creating a new project
uv init new-project
cd new-project

# 2. Installing dependencies
uv add requests pandas

# 3. Running Python scripts
uv run main.py
```

If I'm cloning an existing project that already uses `uv`, the steps are just as simple:

```bash
# 1. Cloning a project
git clone https://github.com/odhyp/sipd-ri.git
cd sipd-ri

# 2. Installing dependencies
uv sync

# 3. Running Python scripts
uv run main.py
```

It's that simple now. I don't need to think about whether I've activated a virtual environment, I just start building (or using) the project.
