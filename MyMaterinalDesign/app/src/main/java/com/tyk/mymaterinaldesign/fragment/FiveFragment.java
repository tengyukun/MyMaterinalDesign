package com.tyk.mymaterinaldesign.fragment;

import android.util.Log;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.tyk.mymaterinaldesign.R;
import com.tyk.mymaterinaldesign.utils.JavascriptInterface;

import org.xutils.view.annotation.ViewInject;
import org.xutils.x;

/**
 * Created by Administrator on 2017/4/5 0005.
 */

public class FiveFragment extends BaseFragment {


    @ViewInject(R.id.wv_fragmentfour_content)
    private WebView wv_fragmentfour_content;

    @Override
    public View initView() {

        View view=View.inflate(activity, R.layout.fragment_five,null);
        x.view().inject(this,view);
        initWebView();
        Log.e("Fragment","five");
        return view;
    }




//    @Override
//    public void onStart() {
//        super.onStart();
//        Log.e("Fragment","five--onStart");
//    }
//
//
//    @Override
//    public void onResume() {
//        super.onResume();
//        Log.e("Fragment","five--onResume");
//    }

    private void initWebView() {

        WebSettings webSettings=wv_fragmentfour_content.getSettings();

        // 设置与Js交互的权限
        webSettings.setJavaScriptEnabled(true);
        // 设置允许JS弹窗
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        //防止中文乱码
        wv_fragmentfour_content.getSettings().setDefaultTextEncodingName("UTF-8");
        // 先载入JS代码
        // 格式规定为:file:///android_asset/文件名.html
//        wv_fragmentfour_content.loadUrl("file:///android_asset/image.html");
//        wv_fragmentfour_content.loadUrl("http://www.toutiao.com/a6401738581286682881/#p=1");
        wv_fragmentfour_content.loadUrl("http://fashion.qq.com/a/20170416/010334.htm");
        //载入js
        wv_fragmentfour_content.addJavascriptInterface(new JavascriptInterface(activity),"imagelistner");
        wv_fragmentfour_content.setWebViewClient(new WebViewClient(){










        });

        //遍历img节点，加入监听
        wv_fragmentfour_content.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                //这段js函数的功能就是注册监听，遍历所有的img标签，并添加onClick函数，函数的功能是在图片点击的时候调用本地java接口并传递url过去
                wv_fragmentfour_content.loadUrl("javascript:(function(){"
                        + "var objs = document.getElementsByTagName(\"img\"); "
                        + "for(var i=0;i<objs.length;i++)  " + "{"
                        + "    objs[i].onclick=function()  " + "    {  "
                        + "        window.imagelistner.openImage(this.src);  "
                        + "    }  " + "}" + "})()");

            }
        });
    }
}
