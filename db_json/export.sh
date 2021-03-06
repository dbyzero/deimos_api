#!/bin/bash
mongoexport -d deimos_test -c accounts > json/accounts.json
mongoexport -d deimos_test -c avatars > json/avatars.json
mongoexport -d deimos_test -c gameareas > json/gameareas.json
mongoexport -d deimos_test -c itemtemplates > json/itemtemplates.json
mongoexport -d deimos_test -c monstertemplates > json/monstertemplates.json
mongoexport -d deimos_test -c effects > json/effects.json
mongoexport -d deimos_test -c rectanglezonetemplates > json/rectanglezonetemplates.json
mongoexport -d deimos_test -c spherezonetemplates > json/spherezonetemplates.json
mongoexport -d deimos_test -c skills > json/skills.json
