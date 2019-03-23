export class Dots extends React.Component {
  static defaultProps: {
    color: string;
    delayMS: number;
    size: string;
    velocity: number;
    style: any;
  };
  constructor(...args: any[]);
  forceUpdate(callback: any): void;
  render(): any;
  setState(partialState: any, callback: any): void;
}


export namespace Dots{

  namespace propTypes {
    function color(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace color {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function delayMS(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace delayMS {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function size(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace size {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function velocity(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace velocity {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
}
export function Inline(_ref4: any): any;
export namespace Inline {
  const defaultProps: {
    color: string;
    size: number;
  };
  namespace propTypes {
    function color(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace color {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function size(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace size {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
}
export function Skeleton(_ref: any): any;
export namespace Skeleton {
  const defaultProps: {
    height: string;
    width: string;
  };
  namespace propTypes {
    function dark(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace dark {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function height(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace height {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function style(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace style {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function width(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace width {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
}
export class Spinner {
  static defaultProps: {
    color: string;
    delayMS: number;
    duration: number;
    size: string;
  };
  constructor(props: any);
  forceUpdate(callback: any): void;
  render(): any;
  setState(partialState: any, callback: any): void;
}
export namespace Spinner {
  namespace propTypes {
    function color(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace color {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function delayMS(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace delayMS {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function duration(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace duration {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function size(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace size {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
}
