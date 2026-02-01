# Vibe-app
Create repository
import 'package:flutter/material.dart';

void main() => runApp(VibeApp());

class VibeApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: Color(0xFF121212), // Fundo Midnight
        appBar: AppBar(
          title: Text('VIBE', style: TextStyle(letterSpacing: 2, fontWeight: FontWeight.bold)),
          backgroundColor: Color(0xFF1C1C1C),
          centerTitle: true,
          actions: [IconButton(icon: Icon(Icons.waves, color: Color(0xFF6200EE)), onPressed: () {})],
        ),
        body: Column(
          children: [
            Expanded(
              child: ListView(
                padding: EdgeInsets.all(16),
                children: [
                  // Balão do Amigo (Cinza Chumbo)
                  balaoChat("E aí, pronto para entrar na Vibe?", false),
                  // Seu Balão (Roxo Neon)
                  balaoChat("Com certeza! O modo fantasma tá ativo?", true),
                ],
              ),
            ),
            // Barra de digitação
            Container(
              padding: EdgeInsets.all(10),
              color: Color(0xFF1C1C1C),
              child: Row(
                children: [
                  Icon(Icons.mic, color: Color(0xFF6200EE)),
                  SizedBox(width: 10),
                  Expanded(child: Text("Sinta a conversa...", style: TextStyle(color: Colors.grey))),
                  Icon(Icons.send, color: Color(0xFF6200EE)),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget balaoChat(String texto, bool souEu) {
    return Align(
      alignment: souEu ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 5),
        padding: EdgeInsets.all(15),
        decoration: BoxDecoration(
          color: souEu ? Color(0xFF6200EE) : Color(0xFF2C2C2C),
          borderRadius: BorderRadius.circular(15),
        ),
        child: Text(texto, style: TextStyle(color: Colors.white)),
      ),
    );
  }
}
