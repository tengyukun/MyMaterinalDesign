package com.tyk.mymaterinaldesign.fragment;

import android.view.View;
import android.webkit.WebViewClient;

import com.tyk.mymaterinaldesign.R;
import com.tyk.mymaterinaldesign.view.ScrollWebView;

import org.xutils.view.annotation.ViewInject;
import org.xutils.x;

/**
 * Created by Administrator on 2017/4/20 0020.
 */

public class SixFragment extends BaseFragment{

    @ViewInject(R.id.swv_text_content)
    private ScrollWebView swv_text_content;

    @Override
    public View initView() {

        View view=View.inflate(activity, R.layout.activity_web_view,null);

        x.view().inject(this,view);

        swv_text_content.loadUrl("file:///android_asset/text4/index.html");
        swv_text_content.getSettings().setJavaScriptEnabled(true);
        swv_text_content.setWebViewClient(new WebViewClient());

        return view;
    }
}
