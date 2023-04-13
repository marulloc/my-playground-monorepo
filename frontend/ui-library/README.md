# UI Libs (Interactive, UI, Three.js, canvas )

## tailwind

CSS 문서를 보지 않고 빠르게 웹을 빌드 할 수 있게 하는 것이 Tailwind의 목표라고 한다.
이것을 구현하기 위해 utility first 기법을 사용(미리 구현된 css를 사용한다.)

미리 구현된 css 클래스를 사용하다보니 클래스 이름을 정하는 것을 고민하지 않아도 되고
협업할 때도 이미 정해진 규칙을 파악하면 되니까 혼선이 적어진다는 장점이 있다.

tailwind 2 버전에서는 특히 용량관련된 문제가 좀 있었는데
tailwind 3 버전으로 오면서 해당 문제가 어느정도 해소되었다고 한다.

최근 조사에서 만족도 부문 tailwind가 1위를 차지
사용량 부문 tailwind가 bootstrap을 이어 2위를 차지했을 정도로
트렌드로 자리잡았고 DX 측면에서도 빠른기간 안에 개발자들을 만족시키면서
급상승하게 되었다.

특히 vsc에서도 extension이 잘되어있어 클래스명을 사용할 때 자동완성까지 해준다.... 오

-   HTML CSS Support
-   Tailwind CSS Intellisens

그래서 여기서도 ui-library를 구축할 때 tailwind를 적극 사용해보고자 한다.

### setup

tailwind css docs에선 framework 가이드가 나와있다

1.  `yarn workspace @marulloc/ui-library install -D tailwindcss postcss autoprefixer`
    Tailwind를 보좌하는 PostCSS와 Autoprefixer를 설치
    그 가이드를 따라가다보면 tailwindcss와 postcss 그리고 autoprefixer를 설치하게 되는데

        - PostCSS
          PostCSS는 CSS를 변환하는 도구다. 다양한 브라우저와 기기 사이에서도 동일한 CSS를 보이게 하는 것이 매우 중요한데
          PostCSS는 CSS 전처리기로 최신 CSS를 지원하지 않는 브라우저라도 동일한 스타일이 적용되도록 도와주는 것이다.
          (JS에서 Babel과 같은거지 - 그리고 webpack으로 함께 번들링하는 그런 그림)
          Tailwind의 @apply와 같은 고급 기능은 CSS 표준이 아니므로 전처리가 필요하고
          그렇기 때문에 PostCSS를 설치하라고 하는 것이다.
        - Autoprefixer
          Autoprefixer는 PostCSS 플러그인 중 하나로, 벤더 프리픽스를 자동으로 추가하는 도구다.
          벤더 프리픽스란 브라우저에서 새로운 CSS 속성을 지원하기 전에 해당 속성을 지원하는 벤더 접두사를 추가하는 것을 말한다.
          예를 들어 WebKit 기반 브라우저에서는 `-webkit-` 접두사를 사용하고, 모질라 기반 브라우저에서는 `-moz-`접두사를 사용하는 것처럼, 이런 벤더 접수사를 붙여주는 역할을 한다.
          접두사를 붙여야만 브라우저 호환성을 보장할 수 있다.

            - Vendor Prefix
              벤더 프리픽스는 웹 표준으로 정의되기 전에 각 브라우저 회사에서 새로운 CSS 속성을 사용하고자 할때 써야한다.
              Webkit 기반 브라우저(`-webkit-`), 모질라 기반 브라우저(`-moz-`), 마이크로스픝 기반(`-ms-`) 브라우저마다 각자의 프리픽스가 있다.
              예를 들어, `border-radius`는 CSS3 표준이 되었지만, 표준이 되기 전에는
              `-webkit-border-radius` 와 `-moz-border-radius`를 사용해서 테두리에 곡선을 줄 수 있었다.
              따라서 새로운 속성을 사용할 때는 가능한 모든 벤더 프리픽스를 붙여주는 것이 좋다.
              그래야 브라우저 호환성을 보장할 수 있다.

            근데! 여기서 autoprefixer와 같은 것을 사용하면 벤더 프리픽스를 자동으로 붙여준다는 것이지.. 오

2.  `yarn workspace @marulloc/ui-library tailwindcss init -p`
    다음 명령어로 config 파일들을 만들어주는 명령어를 실행한다.
    이 명령어를 통해 tailwind와 postcss의 config 파일이 생성된다.

    -   tailwind.config.js
    -   postcss.config.js

    시키는대로 tailwind.config.js의 content에 가이드와 동일하게 값을 넣어준다.
    tailwind가 적용되는 경로를 명시한 것이다.

3.  global css에 tailwind directive 추가
    @tailwind는 Tailwind CSS에서 제공하는 미리 정의된 CSS 클래스를 사용할 수 있도록 해주는 at-rule(특별한 문법)인데, 이것들이 Tailwind의 본체다.

    -   Directive(지시어)? at-rule(특별한 규칙)?
        CSS에는 특정 스타일 지시어를 사용하여 스타일 규칙에 영향을 주는 것을 지시할 수 있다.
        이것들을 CSS Directive 혹은 at-rule이라고 부르는데

    우리가 잘 아는 @media, @import, @font-fase @page 등이 있다.
    이런 지시어들은 특정 스타일 규칙이나 속성에 대한 "조건부" 로직, 외부 스타일 파일 가져오기, 폰트 정의,
    인쇄용 문서 스타일링 등 다양한 용도로 사용된다.

    tailwind에서 @tailwind 역시 지시어이고
    @tailwind 키워드로 base, components, utilities와 같은 세부규칙을 정의한 것이다.
    (?????) 이런 지시어를 통해 tailwind에서 미리 만들어 둔 클래스를 사용할 수 있는 것인가 ?
    (?????) 아니면 이런 키워드들을 또 쓸 수 있다는 뜻인가 ??

    ```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

    -   @tailwind base
        전역 CSS 스타일을 정의하는 데 사용됩니다. HTML 요소의 기본 스타일, 타이포그래피, 색상 등의 스타일을 지정하고
    -   @tailwind components
        재사용 가능한 UI 컴포넌트를 정의하는 데 사용된다.
        예를 들어, 버튼, 카드, 알림 메시지 등의 컴포넌트를 정의할 수 있게된다.
    -   @tailwind utilities
        작은 스타일 유틸리티 클래스를 정의하는 데 사용됩니다.
        마진, 패딩, 텍스트 정렬, 색상 등의 스타일을 지정하는 클래스를 정의할 수 있게된다.
