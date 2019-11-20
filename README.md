# toy-problems


## toy problem의 학습 목표

- 매일 하루에 한 시간씩 알고리즘 문제를 풀면서 알고리즘적 사고를 합니다. 

## Toy problem 진행 방법

1. 현재 repo를 자신의 Github으로 fork 합니다.
2. fork된 repo를 git clone 명령어로 자신의 local 환경으로 다운로드합니다.
3. Ternimal에 `npm install`을 입력해 dependency들을 설치합니다.
4. `npm install` 이후에 `npm audit fix` 여부를 반드시 확인합니다.
5. `student.json` 파일을 알맞게 수정합니다. `problemNumber` 를 알맞게 수정하여야 해당 번호의 문제의 테스트를 돌릴 수 있습니다.

## 제출 방법

1. student.json 파일에 필요한 정보를 입력합니다.
2. `npm run test` 를 실행시켜 테스트 결과를 업데이트 합니다.
3. `npm run submit`을 실행시켜 toy problem 을 제출합니다.
4. 자신의 github(remote) repo에 push합니다.
