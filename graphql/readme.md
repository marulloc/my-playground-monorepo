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

type에 "!" 를 붙이면 Non Nullable Field가 된다.
그냥 type 을 다음과 같이 명시한다면 "tweet(id:ID): Tweet" 이 코드의 Tweet은
사실 Tweet | null 이라는 의미다.
! 를 붙여주면 "tweet(id:ID!):Tweet!" tweet이라는 쿼리는 항상 ID Scalar Type을 argument로 필요로하고 이 쿼리는 항상 Tweet 타입을 반환할거야 라는 의미가 된다.

하지만 보통 argument가 들어가는 쿼리에는 null 이 올 수 있음을 있지 말자 ㅋㅋ
당연하게도 유저가 DB에 없는 ID 로 쿼리를 요청할 수 있으니 null이 반환될 수 있따.

오히려 이런 쿼리에 non nullable type을 명시하는게 적절하겠지
" allTweets: [Tweet!]!"
allTweets라는 쿼리는 항상 배열을 반환할건데, 그 배열은 다 Tweet으로 채워질거야
없으면 빈배열이겠찌

## Mutation & Query Resolver

resolvers는 데이터를 서빙ㄴ하는 로직이고 타입 정의와 같은 형체를 가지는 하나의 객체다
apollo가 tweet 요청이 오면 resolver의 함수를 실행시킬 것이다.

말그대로 resolver는 Identifier Resolution에서 식별자를 탐색하고 실행시키기 위한 객체고 각 resolver(함수가 되겠지)에는 로직이 담겨있는 것이다.

주의해야 할 점은 resolver를 작성할 때
argument를 받는 resolver는 첫번째 인자로 root argument를 주고
우리가 받는 argument는 두번째 인자로 넘겨준다.

## Type Resolver

어떤 type 내부의 어떤 field든 resolver function을 만들 수도 있다.
DB에 데이터가 없더라도 SDL의 타입에 resolver를 명시하면
gql은 resolver를 찾아서 실행하게 된다.

타입리졸버는 자신을 호출한 객체를 첫번째 인자로 받는다.
그 root arguments 말하는 거임

## Relationships

타입리졸버를 활용
한 타입의 필드 이름과 같고 그 필드를 그대로 반환하는 resolver를 통해서
relationship을 만들 수 있다. 데이터간 연결(참조)겠지?

apollo server는 query가 들어오면 필드 이름에 해당하는 데이터를 찾다가 없으면 결국 해당 이름의 resolver를 찾고 resolver가 있으면 그것을 실행해서 데이터와 연결해서
api로 응답해준다.

## Documentations

# GraphQL for Client (with Apollo-Client)
