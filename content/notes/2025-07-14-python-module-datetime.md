+++
# Metadata
title = "Python Module: Datetime"
description = "Cheatsheet for handling date and time in Python" 
slug = "python-module-datetime"
date = 2025-07-14T21:27:03+07:00
lastmod = 2025-08-05T07:41:40+07:00
draft = false

# Page setting
toc = false

# Taxonomies & Routing
category = "python"
aliases = ["/python-module-datetime"]
+++

A summary/cheatsheet for Python built-in `datetime` module.
This summary covers the core classes and common use cases for working with dates, times, time differences, and formatting in Python.

## Common `strftime()` Format

`strftime()` stands for "string format time", and it's used to convert a `datetime` object into a readable string.

| Code | Meaning                | Example Output    |
| ---- | ---------------------- | ----------------- |
| `%Y` | Year (4 digits)        | `1999`            |
| `%m` | Month (01–12)          | `04` (April)      |
| `%d` | Day of month (01–31)   | `19`              |
| `%A` | Full weekday name      | `Monday`          |
| `%a` | Abbreviated weekday    | `Mon`             |
| `%B` | Full month name        | `April`           |
| `%b` | Abbreviated month name | `Apr`             |
| `%H` | Hour (00–23)           | `07`              |
| `%I` | Hour (01–12)           | `07` (with AM/PM) |
| `%p` | AM or PM               | `AM`              |
| `%M` | Minute (00–59)         | `00`              |
| `%S` | Second (00–59)         | `00`              |
