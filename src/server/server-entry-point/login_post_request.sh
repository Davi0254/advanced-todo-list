#!/bin/bash

 curl -k -H 'Content-Type: application/json'\
      -d '{"user": "davi", "password": "1234"}'\
      https://localhost:3000/auth/login
