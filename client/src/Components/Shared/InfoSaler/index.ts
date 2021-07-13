// import Component from '../../../core/Component';

// export default class InfoSaler extends Component {
//   template() {
//     return `
//       <p class="sub-title">판매자 정보</p>
//       <div class="user-area">
//         <p class="username">Username</p>
//         <p class="location">역삼동</p>
//       </div>
//     `;
//   }
// }

import './styles';

interface PropsType {
  info: string;
  name: string;
  location: string;
}

export default function InfoSaler(props: PropsType) {
  const { info, name, location } = props;
  return `
    <p class="sub-title">${info}</p>
    <div class="user-area">
      <p class="username">${name}</p>
      <p class="location">${location}</p>
    </div>
  `;
}
