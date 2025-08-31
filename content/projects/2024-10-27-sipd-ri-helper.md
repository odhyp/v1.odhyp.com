+++
# Metadata
title = "SIPD-RI Helper"
description = "A command-line automation tool for SIPD-RI 2025 web application 💼"
slug = "sipd-ri-helper"
date = 2024-10-27
lastmod = 2025-08-03T20:15:00+07:00
draft = false

# Page setting
toc = true
featured = true
project_type = "main" # main or other
cover = "/images/2024-10-27/cover-sipd-ri-helper.webp"

# Taxonomies & Routing
tech_stacks = ["python","web automation", "playwright", "pandas", "CLI"]
aliases = ["/sipd-ri-helper", "/sipd-ri"]
+++

**SIPD-RI Helper** is a Python-based command-line application that automates tasks on the [SIPD-RI](https://sipd.kemendagri.go.id/landing) web application. It helps reduce human error and saves time by automating browser actions using Playwright, from login to form submission and data retrieval.

{{< wrapper class="flex justify-center items-center [&>*]:w-fit" >}}
{{< cta href="https://github.com/odhyp/sipd-ri" icon="github" text="View Repository" >}}
{{< /wrapper >}}

## Features

- Automates browser workflows: login, navigation, form submission, and file downloads
- Retry mechanism for unstable elements (e.g. 404 errors, missing dropdowns)
- CLI interface and readable logging
- Modular structure, easy to tweak or extend for future automation needs
- Can be compiled into `.exe` for use on Windows without Python

## Installation

### Requirements

Before installing, make sure you have the following installed:

- [Python 3.12+](https://www.python.org/downloads/)
- [`uv`](https://github.com/astral-sh/uv) (recommended over pip)
- SIPD-RI Account

### Recommended (using `uv`)

1. Clone and move to the repository

   ```bash
   git clone https://github.com/odhyp/sipd-ri.git && cd sipd-ri
   ```

2. Sync dependencies

   ```bash
   uv sync
   ```

3. Install Playwright

   ```bash
   playwright install chromium
   ```

4. Voila! installation success

### (Optional) Running the executable, no Python required

1. Go to the [Releases page](https://github.com/odhyp/sipd-ri/releases)
2. Download the `.zip` archive for Windows
3. Extract it
4. Double-click the `.exe` to run the app

## Usage

### Run the CLI App

```bash
uv run main.py
```

> If you installed using `pip` or have `uv` configured, this will launch the interactive CLI menu

### Steps

1. The app will launch a numbered menu with available automation tasks
2. Select your desired task
3. You’ll be prompted to select the input file if needed
4. The browser will open and begin automation
5. Logs will be generated under `logs/`

## Roadmap

Planned improvements:

- [ ] Update and sync the latest `SKPD` and `Sub SKPD` data
- [x] Rewrite `AKLAP` and `PENATAUSAHAAN` modules for the new SIPD-RI 2025 interface
- [x] Migrate to a modern Python project structure using `uv`

## Contribute

If you'd like to contribute:

1. Fork the repository and clone it
2. Create your new branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes
4. Submit a Pull Request with a clear description

{{< callout type="tip" title="Before submitting, make sure to:" >}}

- Keep code modular (follow the current project pattern)
- Write clear commit messages
- Test it with SIPD-RI web app beforehand

{{< /callout >}}

## License

Distributed under the MIT License. See [LICENSE](https://github.com/odhyp/sipd-ri/blob/master/LICENSE) for more information.
