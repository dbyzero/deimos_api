#!/bin/bash
mongoimport -d deimos_test --drop -c accounts < json/accounts.json
mongoimport -d deimos_test --drop -c avatars < json/avatars.json
mongoimport -d deimos_test --drop -c gameareas < json/gameareas.json
mongoimport -d deimos_test --drop -c itemtemplates < json/itemtemplates.json
mongoimport -d deimos_test --drop -c monstertemplates < json/monstertemplates.json
mongoimport -d deimos_test --drop -c effects < json/effects.json
mongoimport -d deimos_test --drop -c rectanglezonetemplates < json/rectanglezonetemplates.json
mongoimport -d deimos_test --drop -c spherezonetemplates < json/spherezonetemplates.json
mongoimport -d deimos_test --drop -c skills < json/skills.json
