// 220826 선택자에 .search-wrap 추가 오류방지 및 수정
if(document.querySelector('.common-edit-data-list-wrap .search-wrap')){  
    // 학습 라이브러리 영역 검색
    var commonEditDataList = document.querySelector('.common-edit-data-list-wrap');
    commonEditDataList.querySelector('.search .btn-search').addEventListener('click', function(){
        if(!this.parentNode.classList.contains('show')){
            this.parentNode.classList.add('show');
            commonEditDataList.querySelector('.search input').focus();
        }
    })
    commonEditDataList.querySelector('.search input').addEventListener('focus', function(){
        this.parentNode.classList.add('focus');
    })
    commonEditDataList.querySelector('.search input').addEventListener('blur', function(){
        this.parentNode.classList.remove('focus');
    })
    commonEditDataList.querySelector('.search .btn-search-close').addEventListener('click', function(){
        commonEditDataList.querySelector('.search input').value = '';
        //this.parentNode.classList.remove('focus');
        // this.parentNode.classList.remove('show');
    })
}


if(document.querySelector('.accordion-wrap')){
    // 아코디언
    $(document).on('click', '.accordion-wrap .accordion-title', function(e){
        $(this).parents('.accordion-wrap').toggleClass('close');
    })
    
    // 레슨 타이틀 수정 
    $('.lesson-list-wrap').on('click', '.accordion-wrap .btn-edit-title', function(){
        var parents_accordion = $(this).parents('.accordion-wrap');
        parents_accordion.addClass('edit-title');
        parents_accordion.find('.accordion-title input').attr('readonly', false);
    })
    // 레슨 타이틀 인풋 활성화 됐을때
    $('.lesson-list-wrap').on('click', '.accordion-title input', function(e){
        if($(this).is('[readonly]') == false){
            return false;
        }
    })
    // 레슨 타이틀 수정 완료 버튼
    $('.lesson-list-wrap').on('click', '.accordion-wrap .btn-edit-title-confirm', function(e){
        var parents_accordion = $(this).parents('.accordion-wrap');
        parents_accordion.removeClass('edit-title');
        parents_accordion.find('.accordion-title input').attr('readonly', true);
        return false;
    })
}

if(document.querySelector('.selectBox-wrap')){
    // 셀렉트박스 플레이스홀더
    document.querySelectorAll('.selectBox-wrap select').forEach(function(item){
        item.addEventListener('change', function(){
            item.classList.remove('placeholder');
        })
    })
}


$(function(){
    // 달력
    $('.input-calendar').datepicker({
        dateFormat:'yy-mm-dd',
        beforeShow: function(input, inst) {
            $(this).addClass('focus');
            var widget = $(inst).datepicker('widget');
            widget.css('margin-left', $(input).outerWidth() - widget.outerWidth());
        },
        onClose: function() {
            $(this).removeClass('focus');
        }
    });
});


// tab 포커스 추가로 인해, 버튼일경우 마우스 클릭일땐 포커스 해제
$('button').on('mouseup', function(e){
    $(this).blur();
})


// textarea 높이 변경
function textareaAutoHeight(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

// textarea 엔터 방지
$(document).on('keypress', 'textarea',  function(e){    
    // textarea에 enterAble 클래스 추가시 엔터 가능
    if (e.which === 13 && !e.target.classList.contains('enterAble')) {
        e.preventDefault();
    }
})


//--------------------  2021-06-22 추가 --------------------------


// 학습 우측영역 등록 버튼
$('.common-edit-data-list-wrap .top-title-wrap .btn-add').on('click', function(){
    $(this).next().toggle();
})
$('.common-edit-data-list-wrap .top-title-wrap .btn-wrap .button-detail-popup button').on('click', function(){
    $(this).parent().hide();
})

// 셀렉트박스
$(document).on('mouseup', '.selectBox-wrap .selectOption', function(){
    var _parent = $(this).parent();

    if(_parent.hasClass('disabled')){
        return false
    }

    if(_parent.hasClass('active')){
        _parent.removeClass('active');
    }else {
        $('.selectBox-wrap').each(function(){
            $(this).removeClass('active');
        });
        _parent.addClass('active');
    }    
})
// 셀렉트박스 옵션
$(document).on('click', '.selectBox-wrap .optionList li', function(){
    var seletedOption = $(this).text();

    $(this).addClass('on').siblings().removeClass('on');
    $(this).parents('.selectBox-wrap.active').find('.selectOption').text(seletedOption);
    $(this).parents('.selectBox-wrap.active').removeClass('active');
    $(this).parents('.selectBox-wrap.active .optionList').hide();
    
})

// 다른곳 클릭시 닫히게
$(document).click(function(event) { 
    var $target = $(event.target);

    // 학습 우측 등록버튼
    if(!$target.closest('.common-edit-data-list-wrap .top-title-wrap .btn-wrap').length) {
        $('.common-edit-data-list-wrap .top-title-wrap .button-detail-popup').hide();
    }  

    // 셀렉트박스
    if(!$target.closest('.selectBox-wrap').length) {
        $('.selectBox-wrap').removeClass('active');
    } 
});


// 수강생, 학습콘텐츠 우측 체크박스 전체
var checkCount = 0; // 전체 드래그 박스 관련 카운트
$("#data-list-checkAll").change(function() {
    var checkBoxLength = $(".data-list .drag-item input[type=checkbox]").length;

    if (this.checked) {
        $(".data-list .drag-item input[type=checkbox]").each(function() {
            if(!$(this).parent().hasClass('drag-complete')){
                $('.drag-all-card-wrap').addClass('show');
                checkCount = checkBoxLength;
                this.checked=true;
            }
        });
    } else {
        $(".data-list .drag-item input[type=checkbox]").each(function() {
            $('.drag-all-card-wrap').removeClass('show');
            checkCount = 0;
            this.checked=false;
        });
    }
    dragAllCount();
});

// 수강생, 학습콘텐츠 우측 체크박스 개별
$(document).on("click", ".data-list .drag-item input[type=checkbox]", function(){
    if ($(this).is(":checked")) {
        var isAllChecked = 0;

        checkCount ++;
        dragAllCount();

        $(".data-list .drag-item input[type=checkbox]").each(function() {
            if (!this.checked){
                if(!$(this).parent().hasClass('drag-complete')){
                    isAllChecked = 1;
                }
            }                
        });

        if (isAllChecked == 0) {
            $("#data-list-checkAll").prop("checked", true);
        }     
    }
    else {
        checkCount --;
        dragAllCount();

        $("#data-list-checkAll").prop("checked", false);
    }
});
// 전체 드래그 박스
function dragAllCount() {
    if(checkCount > 0) {
        $('.drag-all-card-wrap').addClass('show');
    }else {
        $('.drag-all-card-wrap').removeClass('show');
    }

    $('.drag-all-card-wrap .count-badge span').text(checkCount);
}


//--------------------  2021-07-01 추가 --------------------------

// 학습 생성 팝업 공통 스크립트 

// textarea 값 넣어진 상태로 로딩됐을때 높이 재조정
$('textarea').trigger('oninput');

// 대화학습 스크롤바 생성 + 스크롤 제일 위로
document.querySelectorAll('.modal-create-conversation-learning .scroll-wrap').forEach(function(item, index){
    el = new SimpleBar(item, {autoHide:false});
    el.getScrollElement().scrollTop = 0;            
})

// 파일찾기
$('.modal-create-conversation-learning .modal-input-wrap form input[type=file]').on('change', function(){
    var fileName = $(this)[0].files[0].name;
    $(this).prev().val(fileName)
})

// 파일 첨부버튼 연결
$('.modal-create-conversation-learning .modal-input-wrap form button').on('click', function(){
    var parentsModal = $(this).parents('.modal-wrap');
    var buttonFor = $(this).attr('for');

    parentsModal.find('.modal-input-wrap form input[name='+ buttonFor + ']').click();
})

// 우측 미리보기
var samplePlayWrap = $('.modal-create-conversation-learning .sample-play-wrap');
samplePlayWrap.find('.tab-nav-wrap li').on('click', function(){
    $(this).addClass('on').siblings().removeClass('on');

    var parentsModal = $(this).parents('.modal-wrap');
    var _index = $(this).parent().find('.on').index();

    parentsModal.find('.play-area .play-item').eq(_index).addClass('on').siblings().removeClass('on');

    //gif 재생 초기화
    resetGifCycle(parentsModal.find('.play-area .play-item.on').find('img'));
})
//gif 재생 초기화
function resetGifCycle(e) {
    var src = e.attr('src');
    var gif = src.split('?')[0];
    e.attr('src', '');
    e.attr('src', gif+"?" + Math.random());
}

// 학습만들기 > 대화연습 > 익히기 라디오버튼
var learnWrap = $('.modal-create-conversation-learning .learning-cont-box-wrap .learn-wrap');
learnWrap.find('.type-nav-wrap li').on('click', function(){
    if(!$(this).parents('.modal-create-conversation-learning.type-readOnly').length){
        var _parents = $(this).parents('.modal-create-conversation-learning');
    
        $(this).addClass('on').siblings().removeClass('on');
    
        var _index = $(this).parent().find('.on').index();
    
        $(this).parents('.select-type-wrap').find('.type-detail-wrap .detail-item').eq(_index).addClass('on').siblings().removeClass('on');
    
        if(_parents.hasClass('type-conversation')){
            // 대화학습 팝업일때
            _parents.find('.sample-play-wrap .play-item').eq(2).find('img').attr('src', '../../img/img_create_conv_play_3_'+ (_index+1) +'.gif');
        }else if(_parents.hasClass('type-shortSentence')){
            // 단문학습 팝업일떄
            _parents.find('.sample-play-wrap .play-item').eq(3).find('img').attr('src', '../../img/img_create_shortSentence_play_4_'+ (_index+1) +'.gif');
        }
    }
})

// 학습만들기 > 대화연습 > 익히기 > 중요 표현
$('.modal-create-conversation-learning .important-expression-wrap .select-word span').on('click', function(){    
    if(!$(this).parents('.modal-create-conversation-learning.type-readOnly').length){
        var _this = $(this);
    
        if(!_this.hasClass('on')){
            if(!_this.next().hasClass('on') && !_this.prev().hasClass('on')){
                _this.siblings().removeClass('on');
                _this.addClass('on')
            }else {
                _this.addClass('on')
            }
        }else {
            if (_this.next().hasClass('on') && _this.prev().hasClass('on')){
                _this.siblings().removeClass('on')
                _this.removeClass('on')
            }
            else {
                _this.removeClass('on')
            }
        }
    }
})

// 

// 검색 드롭박스 
$('.search-dropdown-wrap .search-input').on('click', function(){

    if($(this).next().hasClass('show')){
        $(this).next().removeClass('show');
    }else {
        $('.search-dropdown-wrap .search-input').each(function(index, item){
            $(item).next().removeClass('show');
        })

        $(this).next().addClass('show');
    }

    $('.search-dropdown-wrap .popup-search .scroll-wrap .simplebar-content-wrapper').scrollTop(0);
})

// 검색 드롭박스 - 직접입력
$('.search-dropdown-wrap .popup-search .popup-footer-wrap button').on('click', function(){
    $(this).parents('.popup-search').removeClass('show');
    $(this).parents('.search-dropdown-wrap').find('.search-input').val('직접입력');
    $(this).parents('.search-dropdown-wrap').find('.self-input-wrap').addClass('show');
    $(this).parents('.search-dropdown-wrap').find('.self-input-wrap input').focus();
})

// 검색 드롭박스 - 리스트 선택
$('.search-dropdown-wrap .popup-search .search-result-list-wrap ul li').on('click', function(){
    var _text = $(this).text();

    $(this).parents('.popup-search').removeClass('show');
    $(this).parents('.search-dropdown-wrap').find('.search-input').val(_text);

    $(this).parents('.search-dropdown-wrap').find('.self-input-wrap').removeClass('show');
    $(this).parents('.search-dropdown-wrap').find('.self-input-wrap input').val('');
})

// 다른곳 클릭시 닫히게
$(document).click(function(event) { 
    var $target = $(event.target);

    // 학습 우측 등록버튼
    if(!$target.closest('.search-dropdown-wrap .search-input-wrap').length) {
        $('.search-dropdown-wrap .popup-search').removeClass('show');
    }  
});

// 2021-12-23

// 우측 메뉴 리스트 우클릭 contextMenu
var contextMenu = $('.data-list-wrap .context-menu-wrap');
$('.data-list-wrap .data-list').on('contextmenu', '.drag-item', function(e){
    e.preventDefault();

    // 드래그 완료된건 우클릭 방지
    if($(e.target).parents('.drag-item').find('.data-info-card').hasClass('drag-complete')){
        return false
    }

    // 우클릭된 .drag-item에 contextMenu 붙이기
    var _target = $(e.target).parents('.drag-item');
    _target.append(contextMenu);

    // contextMenu 포지션
    var _positionX = e.clientX - $(e.target).parents('.drag-item').offset().left;
    var _positionY = e.clientY - $(e.target).parents('.drag-item').offset().top - 20;            

    if(_positionX <= contextMenu.width() / 2){          
        // 왼쪽 튀어나감 방지  
        contextMenu.css({
            top : _positionY,
            left : 0,
            right : 'auto'
        })
    }else if (_positionX + (contextMenu.width() / 2) >= $(e.target).parents('.drag-item').width()){         
        // 오른쪽 튀어나감 방지
        contextMenu.css({
            top : _positionY,
            left : 'auto',
            right : 0
        })
    }
    else {            
        // 기본
        contextMenu.css({
            top : _positionY,
            left : _positionX - (contextMenu.width() / 2),
            right : 'auto'
        })
    }

    contextMenu.show();
})

// 우측 메뉴 contextMenu 다른곳 클릭하면 닫히게
$(document).click(function(event) { 
    contextMenu.hide();
});

// 수강생, 학습 콘텐츠 우측 타이틀 하단의 탭 (전체, 내가 등록, 초대코드로 등록, 다른 클래스 학생)
$('.common-edit-data-list-wrap .data-list-tab-wrap ul li').on('click', function(){
    $(this).addClass('on').siblings().removeClass('on');
})


// 헤더 메뉴 
$('#header .profile-wrap').on('click', function(){
    $(this).find('.profile-menu-wrap').toggleClass('on');
})

$(document).click(function(event) { 
    var $target = $(event.target);

    // 학습 우측 등록버튼
    if(!$target.closest('#header .profile-wrap').length) {
        $('#header .profile-wrap').find('.profile-menu-wrap').removeClass('on');
    }  
});


// 20727 : 전체동의 추가 // gnb 추가
$(function(){
    // gnb안 배너 스와이퍼
    if ($('.bg-gnb .swiper-container').length != 0){
        var gnbBannerSwiper = new Swiper('.bg-gnb .swiper-container', {
            speed: 500,
            autoplay:true, 
            slidesPerView: 1,
            loop: true,
            observer: true,
            observeParents: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.bg-gnb .swiper-pagination'
            }
        });
    }
    
    sClass.gnb();
    sClass.mypage();
})
var sClass = {
    uiAgreeInit: function (){
        $('[data-agree]').each(function(index,element){
            var _paretnt = $('[data-agree-list="'+$(element).data('agree')+'"]').parents('.term-wrap-list');
            var _dataName = $(element).data('agree');

            if (_paretnt.find('li input:checked').length === _paretnt.find('li').length) {
                $('[data-agree-all="'+_dataName+'"]').prop('checked', true)
            } else {
                $('[data-agree-all="'+_dataName+'"]').prop('checked', false)
            }
        })
        sClass.uiAgreeAll();
        sClass.uiAgreeChg();
    },
    uiAgreeAll : function (){
        $('[data-agree]').each(function(index,element){
            $(document).on('change', '[data-agree-all="'+$(element).data('agree')+'"]', function(){
                var $all = $(this);
                $('[data-agree-list="'+$(element).data('agree')+'"]').each(function(idx,el){
                    if ($all.is(':checked')) {
                        $(el).prop('checked', true)
                    } else {
                        $(el).prop('checked', false)
                    }
                    
                })
            })
        })
    },
    uiAgreeChg: function(){
        $(document).on('change', '[data-agree-list]', function(){
            var $listWrap = $(this).parents('.term-wrap-list');
            var _dataName = $(this).data('agree-list');
            if ($listWrap.find('li input:checked').length  ===  $listWrap.find('li').length ) {
                $('[data-agree-all="'+_dataName+'"]').prop('checked', true)
            } else {
                $('[data-agree-all="'+_dataName+'"]').prop('checked', false)
            }
        })
    },
    gnb: function(){
        if ($('.gnb').length === 0) {
            return false;
        }
        var _dim = '<div class="dim"></div>';
        var $mainMenu;
        $(document).on('mouseover', '.gnb-main-list', function(){
            $mainMenu = $(this);
            if ($(this).hasClass('solo')) {
                $(this).parents('.gnb-menu').siblings().removeClass('on active');
                $(this).parents('.gnb-menu').addClass('on active');
                $('.bg-gnb').removeClass('active');
                $('.dim').animate({
                    opacity : 0
                }, 100, function(){
                    $('.dim').remove();
                })
                return false;
            }
            if (!$('.dim').hasClass('active')) {
               $('body').find('.dim') ? $('body').prepend(_dim) : '';
                setTimeout(function() {
                    $('.dim').addClass('active');    
                    $('.bg-gnb').addClass('active')
                }, 10);
            }
            

            $(this).parents('.gnb-menu').siblings().removeClass('on active');
            $(this).parents('.gnb-menu').addClass('on active');
            
        })
        $(document).on('mouseleave', '#header, .gnb-main-list.solo', function(){
            sClass.gnbClose()
        });
        $(document).on('click', '.gnb-sub-list', function(){
            sClass.gnbClose()
        });
        $(document).on('click', '.dim.active', function(){
            $mainMenu.parents('.gnb-menu').removeClass('active');
            $('.bg-gnb').removeClass('active')
            $('.dim').animate({
                opacity : 0
            }, 100, function(){
                $('.dim').remove();
            })
        });
    },
    gnbClose: function(){
        $('.gnb-menu').removeClass('active on')
        $('.bg-gnb').removeClass('active')
        $('.dim').animate({
            opacity : 0
        }, 100, function(){
            $('.dim').remove();
        })
    },
    mypage: function(){
        $(document).on('click', '#header .btn.mypage', function(){
            $('#header .mypage-wrap .inner').css('left', $(this).offset().left+'px')
            if ($(this).hasClass('on')) {
                $(this).removeClass('on');
                $('#header .mypage-wrap').removeClass('on');
            } else{
                $(this).addClass('on');
                $('#header .mypage-wrap').addClass('on')
            }
        })
    }

}