function master() {
  let a = 1;
  let b = 2;
  console.log('master:', a);

  function test2(a, b) {
    console.log('test2:', a, b);
    test3();
  }

  function test3() {
    console.log('test3:', a, b);
  }
  test2('a', 'b');
}
master();
