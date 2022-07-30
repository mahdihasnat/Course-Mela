#!/bin/bash
/bin/bash -ec 'cd front-end && npm start &'
/bin/bash -ec 'cd back-end && ./mvnw spring-boot:run'