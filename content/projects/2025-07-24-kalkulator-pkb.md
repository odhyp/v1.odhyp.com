+++
# Metadata
title = "Kalkulator PKB"
description = "A simple web app to estimate Indonesian vehicle tax (PKB & PKBOP) based on your vehicle data" 
slug = "kalkulator-pkb"
date = 2025-07-25T07:45:52+07:00
lastmod = 2025-08-03T20:15:00+07:00
draft = false

# Page setting
toc = false
featured = false
project_type = "other" # main or other
cover = "/images/2025-07-25/cover-kalkulator-pkb.webp"

# Taxonomies & Routing
tech_stacks = ["Python", "Flask", "JavaScript", "Vercel"]
aliases = ["/kalkulator-pkb"]
+++

Kalkulator PKB is an internal tool designed to assist [Samsat](https://samsat-jogjaprov.id/) staff in the Special Region of Yogyakarta (DIY) calculate Pajak Kendaraan Bermotor (PKB) and Opsen PKB (PKBOP) values before processing vehicle registration documents.

{{< wrapper class="flex justify-center items-center [&>*]:w-fit" >}}
{{< cta href="https://pkb.odhyp.com/" group="material-symbols" icon="calculate-rounded" text="Open the Calculator" >}}
{{< /wrapper >}}

## Features

- Responsive form optimized for both desktop and mobile use
- Input vehicle details: NJKB, vehicle type, license plate type, and ownership
- Automatic calculation of PKB and PKBOP

## Note

This tool is intended for internal Samsat DIY use only. It reflects the latest PKB and PKBOP rules as applied in Special Region of Yogyakarta Province and should be used as a reference prior to entering data into the official Samsat system.
