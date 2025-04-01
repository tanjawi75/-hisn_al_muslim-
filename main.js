document.addEventListener(
  'DOMContentLoaded',
  function() {
    fetch(
        'hisnmuslim.json') // استدعاء ملف JSON
      .then(response => response
        .json())
      .then(data => {
        const tableTbody = document
          .getElementById(
            'table_tbody');
        const categoryContent =
          document.getElementById(
            'category_content');
        const titleIndex = document
          .getElementById(
            'title_index');
        const alrt = document
          .getElementById('alrt');
        const Search = document
          .getElementById('Search');
        
        // عرض الفئات في الجدول
        data.forEach(item => {
          const tr = document
            .createElement(
              'tr');
          tr.innerHTML = `
                    <td class="number_index">${item.id}</td>
                    <td><p class="category" id="category_id_${item.id}">${item.category}</p></td>
                    <td><button class="audio" id="bt_id_${item.id}">تشغيل</button></td>
                `;
          tableTbody
            .appendChild(tr);
        });
        
        // تشغيل الصوت
        document.querySelectorAll(
          '.audio').forEach(
          button => {
            const id = button.id
              .split('bt_id_')[1];
            const sound =
              new Audio(data[id -
                1].audio);
            button.onclick =
              () => {
                if (sound
                  .paused) {
                  sound.play();
                  button
                    .innerText =
                    'إيقاف';
                } else {
                  sound.pause();
                  sound
                    .currentTime =
                    0;
                  button
                    .innerText =
                    'تشغيل';
                }
              };
          });
        
        // عرض محتوى الفئة
        document.querySelectorAll(
          '.category').forEach(
          category => {
            category.onclick =
              () => {
                const id =
                  category.id
                  .split(
                    'category_id_'
                  )[1];
                const
                  categoryData =
                  data[id - 1];
                titleIndex
                  .innerText =
                  categoryData
                  .category;
                categoryContent
                  .innerHTML = `
                        <h2>${categoryData.category}</h2>
                        ${categoryData.array.map(item => `
                            <div class="category_content_li animate__animated animate__fadeIn">
                                <div class="category_top">
                                    <p class="category_text">${item.text}</p>
                                    <audio class="category_audio" src="${item.audio}" controls></audio>
                                </div>
                                <ul class="category_bottom">
                                <li class="count" onclick="decreaseCount(this)">
    التكرار: <span class="category_bottom_number">${item.count}</span>
</li>
                                    <li class="copy">نسخ</li>
                                </ul>
                            </div>
                        `).join('')}
                        <button id="back">رجوع</button>
                    `;
                document
                  .getElementById(
                    'table').style
                  .display =
                  'none';
                Search.style
                  .display =
                  'none';
                categoryContent
                  .style.display =
                  'block';
                
                // زر الرجوع
                document
                  .getElementById(
                    'back')
                  .onclick =
                  () => {
                    window
                      .location
                      .reload();
                  };
                
                // نسخ النص
                document
                  .querySelectorAll(
                    '.copy')
                  .forEach(
                    copyButton => {
                      copyButton
                        .onclick =
                        () => {
                          const
                            text =
                            copyButton
                            .parentElement
                            .parentElement
                            .querySelector(
                              '.category_text'
                            )
                            .innerText;
                          navigator
                            .clipboard
                            .writeText(
                              text
                            );
                          alrt
                            .style
                            .display =
                            'block';
                          setTimeout
                            (() =>
                              alrt
                              .style
                              .display =
                              'none',
                              1000
                            );
                        };
                    });
              };
          });
        
        // البحث
        Search.onkeyup = () => {
          const filter = Search
            .value.toUpperCase();
          document
            .querySelectorAll(
              '.category')
            .forEach(category => {
              const txtValue =
                category
                .textContent ||
                category
                .innerText;
              category
                .parentElement
                .parentElement
                .style.display =
                txtValue
                .toUpperCase()
                .includes(
                  filter) ? '' :
                'none';
            });
        };
      })
      .catch(error => console.error(
        'حدث خطأ أثناء تحميل البيانات:',
        error));
  });

function toggleInfo() {
  const info = document.getElementById('info');
  if (info.style.display === 'none' || info.style.display === '') {
    info.style.display = 'block'; // عرض العنصر
  } else {
    info.style.display = 'none'; // إخفاء العنصر
  }
  // دالة إخفاء info عند الضغط على زر الإخفاء
  document.getElementById('hideButton').addEventListener('click', function() {
    const info = document.getElementById('info');
    info.style.display = 'none'; // إخفاء العنصر
  });
}
// دالة إنقاص العدد عند النقر
function decreaseCount(element) {
  let countSpan = element.querySelector(".category_bottom_number");
  let count = parseInt(countSpan.textContent);
  
  if (count === 1) {
    showCompletionMessage(); // عرض الرسالة قبل أن يصبح العدد 0
  }
  
  if (count > 0) {
    count--; // إنقاص العدد
    countSpan.textContent = count; // تحديث العرض
  }
}

// دالة عرض رسالة "تم إكمال الذكر"
function showCompletionMessage() {
  const alrt1 = document.getElementById('alrt1'); // نفس العنصر المستخدم في النسخ
  alrt1.innerText = "تم إكمال الذكر"; // تغيير النص
  alrt1.style.display = 'block'; // إظهار الرسالة
  
  setTimeout(() => {
    alrt1.style.display = 'none'; // إخفاء الرسالة بعد ثانية
  }, 1000);
}