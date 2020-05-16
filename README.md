# portfolio

# Bem (Block Element Modifier) - 컴포넌트 단위

- 어떻게 하면 CSS를 잘 작성할 것인가
- BEM: http://getbem.com/introduction/
- BEM 101 by CSS-Tricks: https://css-tricks.com/bem-101/

- 10 Common Problems And How To Avoid Them:

  - https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/

- block\_\_element--modifier
- button--blue (자체로 컴포넌트)

# CSS

### Box Model

- box-sizing : content-box
- box-sizing : border-box : border 까지 포함하는 with content 가 줄어 든다.

### Position

- absolute : 원래있던 자리에서 빠져나온다.(부모중 static아닌 값 기준)
- static : 기본 (top 영향 없음)
- relative : 기존에 있던 자리에서 움직인다.
- sticky : 부모 안 자리에 고정이 된다. ?
- fixed : view port

### Center Tric

- block, margin : 0 auto; (수평)
- text-align, line-height(부모 height)
- transform: translate(50%, 50%);

### background

- background-image: url();
- background-repeat: no-repeat;
- background-position:center;
- background-size: cover;
- background: center/cover no-repeat url()

### translform : 변화를 준다.

- transform:
  - translateX(100px)
  - translate(100px -20px)
  - scale(1.2)
  - rotate(45deg)

### transition : 변화의 과정

- transition:
  - transition-property: color
  - transision-durationL 300mss
  - transition: background-color 300me linear; (한 방에 쓰기)
