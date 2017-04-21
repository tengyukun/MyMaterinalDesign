package com.tyk.mymaterinaldesign.fragment;

import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.tyk.mymaterinaldesign.R;
import com.tyk.mymaterinaldesign.utils.socket.TcpSocketClient;

import org.xutils.view.annotation.ViewInject;
import org.xutils.x;

/**
 * Created by Administrator on 2017/3/24 0024.
 */

public class FourFragment extends BaseFragment {

    @ViewInject(R.id.tv_fragmentfour_content)
    private TextView tv_fragmentfour_content;

    @ViewInject(R.id.et_fragmentfour_content)
    private EditText et_fragmentfour_content;

    @ViewInject(R.id.btn_fragmentfour_send)
    private Button btn_fragmentfour_send;


    // 服务端地址
    private final static String serverIp = "192.168.1.66";
    // 服务端口号
    private final static int serverPort = 9999;

    private TcpSocketClient tcpSocketClient;

    Handler handler=new Handler();


    @Override
    public View initView() {
        View view=View.inflate(activity, R.layout.fragment_four,null);
        x.view().inject(this,view);
        Log.e("Fragment","four");
        return view;
    }



//    @Override
//    public void onStart() {
//        super.onStart();
//        Log.e("Fragment","four--onStart");
//    }
//
//
//    @Override
//    public void onResume() {
//        super.onResume();
//        Log.e("Fragment","four--onResume");
//    }


    private void initSocket() {

        tcpSocketClient = new TcpSocketClient(new TcpSocketClient.TcpSocketListener() {
            @Override
            public void callBackContent(final String content) {

                handler.post(new Runnable() {
                    @Override
                    public void run() {
                        if (tv_fragmentfour_content!=null){
                            tv_fragmentfour_content.setText(tv_fragmentfour_content.getText().toString()+content);
                            Log.e("TAG",content);
                        }
                    }
                });
            }
            @Override
            public void clearInputContent() {

                if (et_fragmentfour_content!=null){
                    et_fragmentfour_content.setText("");
                }

            }
        });

        tcpSocketClient.startTcpSocketConnect();

        btn_fragmentfour_send.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                tcpSocketClient.sendMessageByTcpSocket(et_fragmentfour_content.getText().toString());
            }
        });
    }

    @Override
    public void initData() {
        super.initData();
        initSocket();
    }


    @Override
    public void onDestroy() {

        if (tcpSocketClient!=null){
            tcpSocketClient.sendMessageByTcpSocket("exit");
        }
        super.onDestroy();
    }
}
