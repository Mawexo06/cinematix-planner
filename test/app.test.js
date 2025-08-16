import test from 'node:test';
import assert from 'node:assert';

function fmtDate(d){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function parseDateString(str){
  const [y,m,day] = str.split('-').map(Number);
  return new Date(y, m-1, day);
}
function sameDay(a,b){
  return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
}

test('fmtDate and parseDateString are inverses', () => {
  const d = new Date(2024, 5, 3);
  assert.ok(sameDay(parseDateString(fmtDate(d)), d));
});

test('sameDay detects different dates', () => {
  const a = new Date(2024,0,1);
  const b = new Date(2024,0,2);
  assert.ok(!sameDay(a,b));
});
