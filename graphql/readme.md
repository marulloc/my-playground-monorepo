# GraphQL

사내에서 글로벌 e커머스 Headless 플랫폼을 구축하는 프로젝트를 리드하게 되었는데, 우리의 몸통이 되는 Shopify가 GQL로 api를 제공하게 되면서 GQL을 접하게 되었다.

GQL api를 쏘고 받는 내 코드가 너무 불만족스러워서 제대로 공부하고자 이 레포지토리를 생성했고 앞으로 이 폴더는 어떻게 프론트엔드에서 GraphQL을 잘 쓸 수 있을지를 찾기 위한 자료와 코드들이 저장될 예정이다.

## What is API (Appication Programming Interface)

우리가 흔히 말하는 API는 REST api 와 graphQL api만 존재하는 것이 아니다.
브라우저의 Web api도 있는 것첢 api는 광범위한 개념(?)이다.

컴퓨터 공학 시간에 들은 Interface를 기억해보면..  
'대충 뭐 시스템간 소통하는 방식을 정의해둔 것'인 것 같다.

... more

## What is REST API

### REST API with HTTP

## What is GraphQL

graphQL은 Specification(개념에 대한 설명서?) 같은 거지 뭐 라이브러리 같은 것이 아니다.이 GraphQL의 specification을 보고 이 개념을 구현할 라이브러리 같은 것들이 생성된거다.
https://github.com/graphql/graphql-spec
위 링크에 그 스펙에 대한 내용이 자세하게 적혀있다.

그렇다면 GQL은 어떤 문제를 해결하기 위해 등장했을까 ?

### Overfetching

REST api의 단점인 Overfetching은 내가 요청하지 않았는데 너무 많은 데이터를 넘겨준다는 것을 의미한다. Backend나 DB의 안써도 될 리소스를 사용해야 한다는 것이고 데이터의 크기가 커서 네트워크 부하, 데이터 전송이 느려지는 등의 문제가 생기지

graphQL은 end point 하나만 입력한다고 모든 데이터를 주지 않는다
필요한 데이터를 요청하면 내가 원하는 데이터만 받는다.

### Underfetching

REST api의 또다른 단점은 내가 원하는 데이터가 한 end point에서 모두 얻지 못하는 경우가 많아서 여러 api를 쏴야된다는 불편함이 있다는 것이다. 당연히 네트워크 부하 문제도 있겠지

# GraphQL for Server (with Apollo-Server)

## apollo ?

## Query Type

gql api는 수많은 type 들의 집합이라 data의 타입들, 또 어떻게 리턴할건지 어떻게 사용자가 쓸 수 있는지 정의해야 된다.
이게 모두 gql의 schema다 gql api 구축에 도움을 주는 apolloServer를 실행시키려면 당연히 우리의 스키마를 전달해줘야된다.
그래서 schema definition language를 통해 스키마를 정의해주고 이걸 전달해줘야된다.

근데 이 스키마에서 가장 중요한 것이 바로 query type이다.

## Scalar and Root Type

-   scalar Type은 gql 내장 타입으로 Boolean, String, ID, Int가 있다.

## Mutation Type

type Query 는 REST api의 GET 엔드 포인트를 만드는 것이라면
Mutation는 Put Post Delete의 엔드포인트를 만드는 것과 같다.
type Mutation

## Non Nullable Fields

## Query Resolver

## Mutation Resolver

## Type Resolver

## Relationships

## Documentations

# GraphQL for Client (with Apollo-Client)
